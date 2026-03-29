import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    subscribeToCollection,
    addSubscriberToFirestore,
    addOrderToFirestore,
    updateOrderStatusInFirestore,
    addProductToFirestore,
    addSupplierToFirestore,
    addCourierToFirestore,
    updateSubscriberInFirestore,
    deleteSubscriberFromFirestore,
    bulkUpdateSubscribersInFirestore,
    bulkDeleteSubscribersFromFirestore,
    updateProductInFirestore,
    deleteProductFromFirestore,
    updateOrderInFirestore,
    updateSupplierInFirestore,
    updateCourierInFirestore,
    deleteCourierFromFirestore,
    updateUserInFirestore,
    addExpenseToFirestore,
    updateExpenseInFirestore,
    deleteExpenseFromFirestore,
    addCategoryToFirestore,
    deleteCategoryFromFirestore,
    subscribeToUser,
    addReconciliationToFirestore,
    registerUserToFirestore,
    addIncomingCallToFirestore,
    deleteIncomingCallFromFirestore,
    clearIncomingCallsFromFirestore,
    sendDeviceCommand
} from '../services/firestoreService';

const createSafeStorage = () => {
    if (typeof window === 'undefined') {
        return undefined;
    }

    try {
        const testKey = '__bayios_storage_test__';
        window.localStorage.setItem(testKey, '1');
        window.localStorage.removeItem(testKey);
        return window.localStorage;
    } catch (error) {
        console.warn('localStorage is unavailable, falling back to in-memory persistence.', error);
        return undefined;
    }
};

const useStore = create(
    persist(
        (set, get) => ({
            currentUser: null,
            businesses: [],
            subscribers: [],
            products: [],
            orders: [],
            couriers: [],
            suppliers: [],
            expenses: [],
            categories: [],
            reconciliations: [],
            activationCodes: [],
            incomingCalls: [],
            activeCall: null,
            accounting: {
                dailyExpenses: [],
                dailyIncome: 0,
                supplierDebt: 0,
            },
            notifications: [],
            isSyncing: false,
            syncError: null,
            unsubscribers: [],

            setUser: (user) => set({ currentUser: user }),

            cleanupListeners: () => {
                const currentUnsubs = get().unsubscribers;
                if (currentUnsubs && currentUnsubs.length > 0) {
                    currentUnsubs.forEach((unsub) => {
                        if (typeof unsub === 'function') unsub();
                    });
                }
                set({ unsubscribers: [], isSyncing: false });
            },

            setActiveCall: (call) => set({ activeCall: call }),
            clearActiveCall: () => set({ activeCall: null }),

            clearData: () => set({
                subscribers: [],
                products: [],
                orders: [],
                couriers: [],
                suppliers: [],
                expenses: [],
                categories: [],
                reconciliations: [],
                incomingCalls: [],
                accounting: { dailyExpenses: [], dailyIncome: 0, supplierDebt: 0 },
                notifications: []
            }),

            getBusinessId: () => {
                const user = get().currentUser;
                if (!user) return null;
                const role = (user.role || '').toLowerCase();
                return role === 'admin' ? user.id : user.businessId;
            },

            addIncomingCall: async (callData) => {
                const businessId = get().getBusinessId();
                if (!businessId) return;

                await addIncomingCallToFirestore({
                    ...callData,
                    businessId,
                    status: 'Cevapsız',
                    timestamp: new Date().toISOString()
                });
            },

            deleteIncomingCall: async (id) => {
                await deleteIncomingCallFromFirestore(id);
            },

            sendDeviceCommand: async (deviceId, command, payload) => {
                await sendDeviceCommand(deviceId, command, payload);

                if (deviceId) {
                    const identifier = command.toLowerCase();
                    console.log(`Sending remote command to device ${deviceId}: ${identifier}`);
                }
            },

            clearIncomingCalls: async () => {
                const businessId = get().getBusinessId();
                if (businessId) {
                    await clearIncomingCallsFromFirestore(businessId);
                }
            },

            updateIncomingCall: (id, updates) => set((state) => ({
                incomingCalls: state.incomingCalls.map((c) => (c.id === id ? { ...c, ...updates } : c))
            })),

            initFirestoreSync: () => {
                const user = get().currentUser;
                if (!user) return;

                try {
                    const currentUnsubs = get().unsubscribers;
                    if (currentUnsubs && currentUnsubs.length > 0) {
                        currentUnsubs.forEach((unsub) => {
                            if (typeof unsub === 'function') unsub();
                        });
                    }

                    const unsubs = [];
                    set({ isSyncing: true, syncError: null, unsubscribers: [] });

                    const userRole = (user.role || '').toLowerCase();

                    const addUnsub = (unsub) => {
                        if (typeof unsub === 'function') unsubs.push(unsub);
                    };

                    const errorHandler = (err) => {
                        console.error('Sync error:', err);
                        set({ syncError: err.message || 'Veri senkronizasyon hatası' });
                        get().addNotification('Veri bağlantısı hatası: ' + (err.message || 'Check connection'), 'error');
                    };

                    addUnsub(subscribeToUser(user.id, (userData) => {
                        if (userData) {
                            set((state) => {
                                if (!state.currentUser) return state;
                                const updatedUser = { ...state.currentUser, ...userData };
                                if (!updatedUser.role && state.currentUser?.role) {
                                    updatedUser.role = state.currentUser.role;
                                }
                                return { currentUser: updatedUser };
                            });
                        }
                    }, errorHandler));

                    if (userRole === 'developer') {
                        addUnsub(subscribeToCollection('users', (data) => set({ businesses: data }), null, { onError: errorHandler }));
                        addUnsub(subscribeToCollection('subscribers', (data) => set({ subscribers: data }), 'timestamp', { onError: errorHandler }));
                        addUnsub(subscribeToCollection('orders', (data) => set({ orders: data }), 'timestamp', { onError: errorHandler }));
                        addUnsub(subscribeToCollection('products', (data) => set({ products: data }), 'timestamp', { onError: errorHandler }));
                        addUnsub(subscribeToCollection('suppliers', (data) => set({ suppliers: data }), 'timestamp', { onError: errorHandler }));
                        addUnsub(subscribeToCollection('couriers', (data) => set({ couriers: data }), null, { onError: errorHandler }));
                        addUnsub(subscribeToCollection('expenses', (data) => set({ expenses: data }), 'timestamp', { onError: errorHandler }));
                        addUnsub(subscribeToCollection('categories', (data) => set({ categories: data }), 'timestamp', { onError: errorHandler }));
                        addUnsub(subscribeToCollection('reconciliations', (data) => set({ reconciliations: data }), 'timestamp', { onError: errorHandler }));
                        addUnsub(subscribeToCollection('activationCodes', (data) => set({ activationCodes: data }), 'createdAt', { onError: errorHandler }));
                        set({ unsubscribers: unsubs, isSyncing: false });
                        return;
                    }

                    addUnsub(subscribeToCollection('users', (data) => set({ businesses: data }), null, {
                        field: 'role',
                        operator: '==',
                        value: 'admin',
                        onError: errorHandler
                    }));

                    if (userRole === 'customer') {
                        addUnsub(subscribeToCollection('orders', (data) => set({ orders: data }), 'timestamp', {
                            field: 'customerId',
                            operator: '==',
                            value: user.id,
                            onError: errorHandler
                        }));
                        set({ unsubscribers: unsubs, isSyncing: false });
                        return;
                    }

                    const businessId = userRole === 'admin' ? user.id : user.businessId;

                    if (!businessId) {
                        console.warn('initFirestoreSync: businessId is missing for role requiring it, skipping detailed sync', {
                            userRole,
                            userId: user.id
                        });
                        set({ unsubscribers: unsubs, isSyncing: false });
                        return;
                    }

                    const filter = { field: 'businessId', operator: '==', value: businessId, onError: errorHandler };

                    addUnsub(subscribeToCollection('subscribers', (data) => set({ subscribers: data }), 'timestamp', filter));
                    addUnsub(subscribeToCollection('orders', (data) => set({ orders: data }), 'timestamp', filter));
                    addUnsub(subscribeToCollection('products', (data) => set({ products: data }), 'timestamp', filter));
                    addUnsub(subscribeToCollection('suppliers', (data) => set({ suppliers: data }), 'timestamp', filter));
                    addUnsub(subscribeToCollection('couriers', (data) => set({ couriers: data }), null, filter));
                    addUnsub(subscribeToCollection('expenses', (data) => set({ expenses: data }), 'timestamp', filter));
                    addUnsub(subscribeToCollection('categories', (data) => set({ categories: data }), 'timestamp', filter));
                    addUnsub(subscribeToCollection('reconciliations', (data) => set({ reconciliations: data }), 'timestamp', filter));
                    addUnsub(subscribeToCollection('incoming_calls', (data) => set({ incomingCalls: data }), 'timestamp', filter));

                    set({ unsubscribers: unsubs, isSyncing: false });

                    setTimeout(() => {
                        get().checkAutoSuspensions();
                    }, 3000);
                } catch (err) {
                    console.error('initFirestoreSync crashed:', err);
                    set({
                        syncError: err?.message || 'Veri senkronizasyon hatası',
                        isSyncing: false,
                        unsubscribers: []
                    });
                    get().addNotification('Veri bağlantısı hatası: ' + (err?.message || 'Check connection'), 'error');
                }
            },

            addNotification: (message, type = 'info', duration = 3000) => {
                const id = Date.now();
                set((state) => ({
                    notifications: [...state.notifications, { id, message, type }]
                }));
                if (duration > 0) {
                    setTimeout(() => {
                        set((state) => ({
                            notifications: state.notifications.filter((n) => n.id !== id)
                        }));
                    }, duration);
                }
            },

            removeNotification: (id) => {
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id)
                }));
            },

            selectBusinessForCustomer: (businessId) => {
                if (!businessId) {
                    set({ products: [] });
                    return;
                }
                subscribeToCollection('products', (data) => set({ products: data }), 'timestamp', {
                    field: 'businessId',
                    operator: '==',
                    value: businessId
                });
            },

            setSubscribers: (subscribers) => set({ subscribers }),

            addSubscriber: async (subscriber) => {
                return await addSubscriberToFirestore({ ...subscriber, businessId: get().getBusinessId() });
            },

            updateSubscriber: async (subscriberId, data) => {
                await updateSubscriberInFirestore(subscriberId, data);
            },

            deleteSubscriber: async (subscriberId) => {
                await deleteSubscriberFromFirestore(subscriberId);
            },

            bulkUpdateSubscribers: async (subscriberIds, data) => {
                await bulkUpdateSubscribersInFirestore(subscriberIds, data);
            },

            bulkDeleteSubscribers: async (subscriberIds) => {
                await bulkDeleteSubscribersFromFirestore(subscriberIds);
            },

            addProduct: async (product) => {
                const docRef = await addProductToFirestore({ ...product, businessId: get().getBusinessId() });
                return docRef.id;
            },

            updateProduct: async (productId, data) => {
                await updateProductInFirestore(productId, data);
            },

            deleteProduct: async (productId) => {
                await deleteProductFromFirestore(productId);
            },

            addSupplier: async (supplier) => {
                await addSupplierToFirestore({ ...supplier, businessId: get().getBusinessId() });
            },

            updateSupplier: async (supplierId, data) => {
                await updateSupplierInFirestore(supplierId, data);
            },

            addCourier: async (courier) => {
                await addCourierToFirestore({ ...courier, businessId: get().getBusinessId() });
            },

            addCourierAccount: async (courierData) => {
                const businessId = get().getBusinessId();
                const userRef = await registerUserToFirestore({
                    ...courierData,
                    businessId,
                    role: 'courier',
                    status: 'Active'
                });
                return userRef;
            },

            updateCourier: async (courierId, data) => {
                await updateCourierInFirestore(courierId, data);
            },

            deleteCourier: async (courierId) => {
                await deleteCourierFromFirestore(courierId);
            },

            addCategory: async (category) => {
                await addCategoryToFirestore({ ...category, businessId: get().getBusinessId() });
            },

            deleteCategory: async (categoryId) => {
                await deleteCategoryFromFirestore(categoryId);
            },

            updateStock: async (productId, quantity) => {
                const product = get().products.find((p) => p.id === productId);
                if (!product) return;

                const category = get().categories.find((c) => c.id === product.type);
                const categoryLabel = (category?.label || '').toLowerCase();
                const isTrackingEmpty = categoryLabel.includes('damacana') || categoryLabel.includes('tüp');

                const updates = { stock: (product.stock || 0) + quantity };
                if (isTrackingEmpty) {
                    updates.emptyStock = (product.emptyStock || 0) - quantity;
                }

                await updateProductInFirestore(productId, updates);
            },

            addOrder: async (order) => {
                const now = new Date();
                const datePart = `${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
                const timePart = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
                const orderNumber = `${datePart}-${timePart}`;

                const newOrder = {
                    ...order,
                    orderNumber,
                    status: 'Hazırlanıyor',
                    timestamp: now.toISOString()
                };

                const businessId =
                    order.businessId ||
                    (get().currentUser?.role === 'admin' ? get().currentUser?.id : get().currentUser?.businessId);

                newOrder.businessId = businessId;

                const docRef = await addOrderToFirestore(newOrder);

                if (businessId) {
                    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                    fetch(`${apiUrl}/api/send-notification`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            targetUserId: businessId,
                            title: 'Yeni Sipariş Alındı!',
                            body: `${newOrder.customer} tarafından yeni bir sipariş oluşturuldu: ${newOrder.product}`
                        })
                    }).catch((e) => console.log('Push error:', e));
                }

                return docRef;
            },

            updateOrder: async (orderId, data) => {
                await updateOrderInFirestore(orderId, data);
            },

            updateOrderStatus: async (orderId, status) => {
                if (typeof orderId !== 'string') return;

                const order = get().orders.find((o) => o.id === orderId);
                if (!order) return;

                const prevStatus = order.status;
                await updateOrderStatusInFirestore(orderId, status);

                if (status === 'Tamamlandı' && prevStatus !== 'Tamamlandı') {
                    const product = get().products.find((p) => p.id === order.productId);
                    if (product) {
                        const category = get().categories.find((c) => c.id === product.type);
                        const categoryLabel = (category?.label || '').toLowerCase();
                        const isTrackingEmpty = categoryLabel.includes('damacana') || categoryLabel.includes('tüp');

                        const updates = {
                            stock: (product.stock || 0) - (order.quantity || 1)
                        };

                        if (isTrackingEmpty) {
                            updates.emptyStock = (product.emptyStock || 0) + (order.quantity || 1);
                        }

                        await updateProductInFirestore(product.id, updates);
                    }
                }
            },

            cancelOrder: async (orderId) => {
                if (typeof orderId === 'string') {
                    await updateOrderStatusInFirestore(orderId, 'İptal Edildi');
                }
            },

            addExpense: async (expense) => {
                await addExpenseToFirestore({ ...expense, businessId: get().getBusinessId() });
            },

            updateExpense: async (expenseId, data) => {
                await updateExpenseInFirestore(expenseId, data);
            },

            deleteExpense: async (expenseId) => {
                await deleteExpenseFromFirestore(expenseId);
            },

            checkAutoSuspensions: async () => {
                const { subscribers, orders, updateSubscriber } = get();
                const now = new Date();
                const fiftyDaysMs = 50 * 24 * 60 * 60 * 1000;

                for (const sub of subscribers) {
                    if (sub.status === 'Active') {
                        const subOrders = orders.filter((o) => o.customerId === sub.id && o.status === 'Tamamlandı');
                        if (subOrders.length > 0) {
                            const lastOrder = subOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                            const lastOrderDate = new Date(lastOrder.timestamp);
                            if (now - lastOrderDate > fiftyDaysMs) {
                                await updateSubscriber(sub.id, { status: 'Suspended' });
                            }
                        }
                    }
                }
            },

            updateUserSettings: async (updates) => {
                const user = get().currentUser;
                if (!user) return;

                const newSettings = {
                    ...(user.settings || {}),
                    ...(updates.settings || {})
                };

                const newUser = {
                    ...user,
                    ...updates,
                    settings: newSettings
                };

                Object.keys(updates).forEach((key) => {
                    if (key.includes('.')) {
                        const parts = key.split('.');
                        if (parts[0] === 'settings' && parts.length === 2) {
                            newUser.settings[parts[1]] = updates[key];
                            delete newUser[key];
                        }
                    }
                });

                set({ currentUser: newUser });
                await updateUserInFirestore(user.id, updates);
            },

            addReconciliation: async (data) => {
                await addReconciliationToFirestore({ ...data, businessId: get().getBusinessId() });
            },
        }),
        {
            name: 'bayios-storage',
            getStorage: () => createSafeStorage(),
            partialize: (state) => {
                return {
                    currentUser: state.currentUser,
                    notifications: state.notifications,
                };
            },
        }
    )
);

export default useStore;
