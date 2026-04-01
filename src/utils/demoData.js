const DEMO_IDS = {
    admin: 'demo-admin-id',
    courier: 'demo-courier-id',
    customer: 'demo-customer-id',
};

const DEMO_BUSINESS_ID = DEMO_IDS.admin;

const withDocIdentity = (id, data = {}) => ({
    id,
    firestoreId: id,
    ...data,
});

const isoDaysAgo = (daysAgo, hour = 9, minute = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(hour, minute, 0, 0);
    return date.toISOString();
};

export const isDemoUser = (user) => Boolean(
    user?.demoMode ||
    Object.values(DEMO_IDS).includes(user?.id)
);

export const getDemoUser = (role = 'admin') => {
    if (role === 'courier') {
        return {
            id: DEMO_IDS.courier,
            name: 'Demo Kurye',
            role: 'courier',
            businessId: DEMO_BUSINESS_ID,
            phone: '05320000002',
            demoMode: true,
            settings: {
                zoomLevel: '100',
                emailNotifications: true,
                smsNotifications: false,
                soundAlerts: true,
            },
        };
    }

    if (role === 'customer') {
        return {
            id: DEMO_IDS.customer,
            name: 'Demo Müşteri',
            role: 'customer',
            businessId: DEMO_BUSINESS_ID,
            phone: '05320000003',
            address: 'Başak Mah. Demo Sok. No: 10 İstanbul',
            location: { lat: 41.0935, lng: 28.8012 },
            demoMode: true,
            settings: {
                zoomLevel: '100',
                emailNotifications: true,
                smsNotifications: false,
                soundAlerts: true,
            },
        };
    }

    return {
        id: DEMO_IDS.admin,
        name: 'BayiOS Demo İşletme',
        role: 'admin',
        phone: '02120000001',
        address: 'İkitelli OSB Demo Cad. No: 1 İstanbul',
        courierCode: 'DEMO42',
        location: { lat: 41.0924, lng: 28.7997 },
        demoMode: true,
        settings: {
            zoomLevel: '100',
            emailNotifications: true,
            smsNotifications: false,
            soundAlerts: true,
        },
    };
};

export const createDemoDoc = (prefix, payload = {}) => {
    const id = `demo-${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return withDocIdentity(id, payload);
};

export const matchesDemoDocId = (item, targetId) => (
    String(item?.firestoreId || item?.id || '') === String(targetId || '') ||
    String(item?.id || '') === String(targetId || '')
);

export const applyNestedUpdates = (source, updates = {}) => {
    const next = {
        ...(source || {}),
        ...(updates || {}),
    };

    Object.entries(updates || {}).forEach(([key, value]) => {
        if (!key.includes('.')) return;

        const [root, child] = key.split('.');
        next[root] = {
            ...(next[root] || {}),
            [child]: value,
        };
        delete next[key];
    });

    return next;
};

export const getNextDemoLegacyId = (subscribers = []) => {
    const maxLegacy = subscribers.reduce((maxValue, subscriber) => {
        const parsed = Number(String(subscriber?.legacyId || '').replace(/\D/g, ''));
        return Number.isFinite(parsed) ? Math.max(maxValue, parsed) : maxValue;
    }, 1000);

    return String(maxLegacy + 1);
};

export const createDemoState = (user) => {
    const demoUser = {
        ...getDemoUser(user?.role || 'admin'),
        ...(user || {}),
        demoMode: true,
    };

    const business = withDocIdentity(DEMO_BUSINESS_ID, {
        role: 'admin',
        name: 'BayiOS Demo İşletme',
        address: 'İkitelli OSB Demo Cad. No: 1 İstanbul',
        phone: '02120000001',
        courierCode: 'DEMO42',
        location: { lat: 41.0924, lng: 28.7997 },
        subscriptionEndsAt: '2027-12-31T23:59:59.000Z',
    });

    const categories = [
        withDocIdentity('demo-category-damacana', { label: 'Damacana', businessId: DEMO_BUSINESS_ID }),
        withDocIdentity('demo-category-pet', { label: 'PET Grubu', businessId: DEMO_BUSINESS_ID }),
        withDocIdentity('demo-category-tup', { label: 'Tüp', businessId: DEMO_BUSINESS_ID }),
        withDocIdentity('demo-category-ekipman', { label: 'Ekipman', businessId: DEMO_BUSINESS_ID }),
    ];

    const products = [
        withDocIdentity('demo-product-19l', {
            businessId: DEMO_BUSINESS_ID,
            name: '19L Damacana Su',
            type: 'demo-category-damacana',
            price: 120,
            stock: 84,
            emptyStock: 36,
            depositFee: 80,
            imageUrl: '',
            timestamp: isoDaysAgo(7),
        }),
        withDocIdentity('demo-product-12l', {
            businessId: DEMO_BUSINESS_ID,
            name: '12L Cam Damacana',
            type: 'demo-category-damacana',
            price: 150,
            stock: 22,
            emptyStock: 12,
            depositFee: 120,
            imageUrl: '',
            timestamp: isoDaysAgo(6),
        }),
        withDocIdentity('demo-product-pet', {
            businessId: DEMO_BUSINESS_ID,
            name: '24 x 0.5L Paket Su',
            type: 'demo-category-pet',
            price: 95,
            stock: 48,
            emptyStock: 0,
            depositFee: 0,
            imageUrl: '',
            timestamp: isoDaysAgo(5),
        }),
        withDocIdentity('demo-product-tup', {
            businessId: DEMO_BUSINESS_ID,
            name: 'Mutfak Tüpü',
            type: 'demo-category-tup',
            price: 780,
            stock: 18,
            emptyStock: 9,
            depositFee: 450,
            imageUrl: '',
            timestamp: isoDaysAgo(4),
        }),
    ];

    const subscribers = [
        withDocIdentity('demo-subscriber-1001', {
            businessId: DEMO_BUSINESS_ID,
            legacyId: '1001',
            name: 'Ayşe Demir',
            phone: '05320000011',
            address: 'Başakşehir 1. Etap D:12 İstanbul',
            status: 'Active',
            customerUserId: '',
            timestamp: isoDaysAgo(25),
        }),
        withDocIdentity('demo-subscriber-1002', {
            businessId: DEMO_BUSINESS_ID,
            legacyId: '1002',
            name: 'Mehmet Kaya',
            phone: '05320000012',
            address: 'İkitelli Demo Blok No:8',
            status: 'Pending',
            customerUserId: '',
            timestamp: isoDaysAgo(18),
        }),
        withDocIdentity('demo-subscriber-1003', {
            businessId: DEMO_BUSINESS_ID,
            legacyId: '1003',
            name: 'Nil Market',
            phone: '05320000013',
            address: 'Küçükçekmece Toptancılar Sitesi',
            status: 'Suspended',
            isDealer: true,
            timestamp: isoDaysAgo(52),
        }),
        withDocIdentity('demo-subscriber-review', {
            businessId: DEMO_BUSINESS_ID,
            legacyId: '1004',
            name: 'Demo Müşteri',
            phone: '05320000003',
            address: 'Başak Mah. Demo Sok. No: 10 İstanbul',
            status: 'Active',
            customerUserId: DEMO_IDS.customer,
            linkedUserId: DEMO_IDS.customer,
            timestamp: isoDaysAgo(6),
        }),
    ];

    const couriers = [
        withDocIdentity('demo-courier-main', {
            businessId: DEMO_BUSINESS_ID,
            userId: DEMO_IDS.courier,
            name: 'Demo Kurye',
            phone: '05320000002',
            status: 'Active',
            cash: 450,
            currentStock: {
                'demo-product-19l': 8,
                'demo-product-tup': 3,
            },
            location: { lat: 41.0919, lng: 28.8014 },
            timestamp: isoDaysAgo(12),
        }),
    ];

    const suppliers = [
        withDocIdentity('demo-supplier-1', {
            businessId: DEMO_BUSINESS_ID,
            name: 'Demo Kaynak Su A.Ş.',
            phone: '02120000020',
            balance: -4200,
            status: 'Active',
            timestamp: isoDaysAgo(21),
        }),
        withDocIdentity('demo-supplier-2', {
            businessId: DEMO_BUSINESS_ID,
            name: 'Demo Lojistik',
            phone: '02120000021',
            balance: -1800,
            status: 'Active',
            timestamp: isoDaysAgo(16),
        }),
    ];

    const expenses = [
        withDocIdentity('demo-expense-1', {
            businessId: DEMO_BUSINESS_ID,
            title: 'Yakıt',
            category: 'Operasyon',
            amount: 950,
            paymentMethod: 'Nakit',
            timestamp: isoDaysAgo(1, 10, 30),
        }),
        withDocIdentity('demo-expense-2', {
            businessId: DEMO_BUSINESS_ID,
            title: 'Personel Avansı',
            category: 'Personel',
            amount: 1500,
            paymentMethod: 'Banka',
            timestamp: isoDaysAgo(0, 8, 45),
        }),
    ];

    const orders = [
        withDocIdentity('demo-order-1', {
            businessId: DEMO_BUSINESS_ID,
            orderNumber: '260401-091500',
            customerId: 'demo-subscriber-1001',
            customer: 'Ayşe Demir',
            phone: '05320000011',
            address: 'Başakşehir 1. Etap D:12 İstanbul',
            courierId: 'demo-courier-main',
            courier: 'Demo Kurye',
            paymentMethod: 'Nakit',
            product: '19L Damacana Su x2 (Depozitolu)',
            quantity: 2,
            amount: 400,
            productTotal: 240,
            depositTotal: 160,
            status: 'Tamamlandı',
            hasInvoice: true,
            timestamp: isoDaysAgo(0, 9, 15),
            items: [
                {
                    productId: 'demo-product-19l',
                    name: '19L Damacana Su',
                    price: 120,
                    quantity: 2,
                    depositFee: 80,
                    includeDeposit: true,
                },
            ],
        }),
        withDocIdentity('demo-order-2', {
            businessId: DEMO_BUSINESS_ID,
            orderNumber: '260401-103000',
            customerId: DEMO_IDS.customer,
            customer: 'Demo Müşteri',
            phone: '05320000003',
            address: 'Başak Mah. Demo Sok. No: 10 İstanbul',
            courierId: 'demo-courier-main',
            courier: 'Demo Kurye',
            paymentMethod: 'POS',
            product: '24 x 0.5L Paket Su x1',
            quantity: 1,
            amount: 95,
            productTotal: 95,
            depositTotal: 0,
            status: 'Hazırlanıyor',
            hasInvoice: false,
            timestamp: isoDaysAgo(0, 10, 30),
            items: [
                {
                    productId: 'demo-product-pet',
                    name: '24 x 0.5L Paket Su',
                    price: 95,
                    quantity: 1,
                    depositFee: 0,
                    includeDeposit: false,
                },
            ],
        }),
        withDocIdentity('demo-order-3', {
            businessId: DEMO_BUSINESS_ID,
            orderNumber: '260331-174000',
            customerId: 'demo-subscriber-1002',
            customer: 'Mehmet Kaya',
            phone: '05320000012',
            address: 'İkitelli Demo Blok No:8',
            courierId: 'demo-courier-main',
            courier: 'Demo Kurye',
            paymentMethod: 'Veresiye',
            product: 'Mutfak Tüpü x1',
            quantity: 1,
            amount: 780,
            productTotal: 780,
            depositTotal: 0,
            status: 'Yolda',
            hasInvoice: false,
            timestamp: isoDaysAgo(1, 17, 40),
            items: [
                {
                    productId: 'demo-product-tup',
                    name: 'Mutfak Tüpü',
                    price: 780,
                    quantity: 1,
                    depositFee: 450,
                    includeDeposit: false,
                },
            ],
        }),
    ];

    const reconciliations = [
        withDocIdentity('demo-reconciliation-1', {
            businessId: DEMO_BUSINESS_ID,
            courierId: 'demo-courier-main',
            courierName: 'Demo Kurye',
            amount: 1250,
            paymentMethod: 'Nakit',
            timestamp: isoDaysAgo(0, 20, 15),
        }),
    ];

    const incomingCalls = [
        withDocIdentity('demo-call-1', {
            businessId: DEMO_BUSINESS_ID,
            number: '05320000015',
            status: 'Cevapsız',
            timestamp: isoDaysAgo(0, 11, 10),
        }),
    ];

    return {
        currentUser: demoUser,
        businesses: [business],
        subscribers,
        products,
        orders,
        couriers,
        suppliers,
        expenses,
        categories,
        reconciliations,
        activationCodes: [],
        incomingCalls,
        activeCall: null,
        accounting: {
            dailyExpenses: expenses.filter((expense) => String(expense.timestamp).startsWith(new Date().toISOString().slice(0, 10))),
            dailyIncome: orders
                .filter((order) => order.status === 'Tamamlandı')
                .reduce((sum, order) => sum + Number(order.amount || 0), 0),
            supplierDebt: suppliers.reduce((sum, supplier) => sum + Math.abs(Number(supplier.balance || 0)), 0),
        },
        notifications: [
            {
                id: Date.now(),
                type: 'info',
                message: 'App Review Demo aktif. Tüm ana modüller örnek verilerle kullanılabilir.',
            },
        ],
        isSyncing: false,
        syncError: null,
        unsubscribers: [],
    };
};
