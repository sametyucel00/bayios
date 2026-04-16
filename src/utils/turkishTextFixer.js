const EXACT_REPLACEMENTS = new Map([
  ['M\uFFFDsait', 'M\u00fcsait'],
  ['D\uFFFDzenle', 'D\u00fczenle'],
  ['\uFFFDzerindeki Stok', '\u00dczerindeki Stok'],
  ['T\uFFFDp', 'T\u00fcp'],
  ['G\uFFFDncel Kasa', 'G\u00fcncel Kasa'],
  ['DETAYLI ANAL1Z', 'DETAYLI ANAL\u0130Z'],
  ['Yenilemek i\uFFFDin tekrar bas1n', 'Yenilemek i\u00e7in tekrar bas\u0131n'],
  ['Kurye kodu ba_ar1yla yenilendi!', 'Kurye kodu ba\u015far\u0131yla yenilendi!'],
  ['Kurye kodu kopyaland1!', 'Kurye kodu kopyaland\u0131!'],
  ['Aktif G\uFFFDrevler', 'Aktif G\u00f6revler'],
  ['1_letme taraf1ndan olu_turuldu', '\u0130\u015fletme taraf\u0131ndan olu\u015fturuldu'],
  ['Kurye bilgileri g\uFFFDncellendi.', 'Kurye bilgileri g\u00fcncellendi.'],
  ['Silmek i\uFFFDin tekrar bas1n!', 'Silmek i\u00e7in tekrar bas\u0131n!'],
  ['Kurye Y\uFFFDnetimi', 'Kurye Y\u00f6netimi'],
  ['YEN1 KURYE EKLE', 'YEN\u0130 KURYE EKLE'],
  ['Hen\uFFFDz Kurye Yok', 'Hen\u00fcz Kurye Yok'],
  ['Ekibinizi olu?turmak i?in yeni kurye kayd? yap?n.', 'Ekibinizi olu\u015fturmak i\u00e7in yeni kurye kayd\u0131 yap\u0131n.'],
  ['Kay?t Ba?lat', 'Kay\u0131t Ba\u015flat'],
  ['Operat\uFFFDr\uFFFD', 'Operat\u00f6r\u00fc'],
  ['Teslimat Performans\uFFFD', 'Teslimat Performans\u0131'],
  ['Ba?ar?l?', 'Ba\u015far\u0131l\u0131'],
  ['Giri\uFFFD Durumu', 'Giri\u015f Durumu'],
  ['G\uFFFDNCEL STOK DURUMU', 'G\u00dcNCEL STOK DURUMU'],
  ['TAHS?L ET', 'TAHS\u0130L ET'],
  ['Sipari?', 'Sipari\u015f'],
  ['Hen?z operasyon kayd? yok.', 'Hen\u00fcz operasyon kayd\u0131 yok.'],
  ['ANAL?ZDEN AYRIL', 'ANAL\u0130ZDEN AYRIL'],
  ['Yeni Kurye Kayd?', 'Yeni Kurye Kayd\u0131'],
  ['Saha ekibine yeni ?ye ekle', 'Saha ekibine yeni \u00fcye ekle'],
  ['?rn: Mehmet Y?lmaz', '\u00d6rn: Mehmet Y\u0131lmaz'],
  ['ARA\uFFFD T1P1', 'ARA\u00c7 T\u0130P\u0130'],
  ['MOTOS1KLET', 'MOTOS\u0130KLET'],
  ['HAF1F T1CAR1', 'HAF\u0130F T\u0130CAR\u0130'],
  ['Kurye Hesab1 Olu_turuldu!', 'Kurye Hesab\u0131 Olu\u015fturuldu!'],
  ['i\uFFFDin giri_ bilgileri a_a\x1f1dad1r.', 'i\u00e7in giri\u015f bilgileri a\u015fa\u011f\u0131dad\u0131r.'],
  ['_1FRE', '\u015e\u0130FRE'],
  ['Kurye bu bilgilerle sisteme giri_ yapabilir. L\uFFFDtfen bu bilgileri kurye ile g\uFFFDvenli bir _ekilde payla_1n.', 'Kurye bu bilgilerle sisteme giri\u015f yapabilir. L\u00fctfen bu bilgileri kurye ile g\u00fcvenli bir \u015fekilde payla\u015f\u0131n.'],
  ['Kurye D\uFFFDzenle', 'Kurye D\u00fczenle'],
  ['Kurye bilgilerini g\uFFFDncelle', 'Kurye bilgilerini g\u00fcncelle'],
  ['G\uFFFDNCELLE', 'G\u00dcNCELLE'],
  ['Tahmini Var1_', 'Tahmini Var\u0131\u015f'],
  ['TAK1B1 KAPAT', 'TAK\u0130B\u0130 KAPAT'],
  ['D?ZENLE', 'D\u00dcZENLE'],
  ['S?PAR??? S?L', 'S\u0130PAR\u0130\u015e\u0130 S\u0130L'],
  ['DAHA FAZLA Y?KLE +50', 'DAHA FAZLA Y\u00dcKLE +50'],
  ['Operasyon / Sipari?', 'Operasyon / Sipari\u015f'],
  ['?r?n ?zeti', '\u00dcr\u00fcn \u00d6zeti'],
  ['Mali De?er', 'Mali De\u011fer'],
  ['Sipari? Kayd? Bulunamad?', 'Sipari\u015f Kayd\u0131 Bulunamad\u0131'],
  ['Sistemde hen?z bu kriterlere uygun sipari? yok.', 'Sistemde hen\u00fcz bu kriterlere uygun sipari\u015f yok.'],
  ['Sipari? ??lemleri', 'Sipari\u015f \u0130\u015flemleri'],
  ['D?ZENLE / DURUM', 'D\u00dcZENLE / DURUM'],
  ['Haz?rlan?yor', 'Haz\u0131rlan\u0131yor'],
  ['HAR?TADA G?R', 'HAR\u0130TADA G\u00d6R'],
  ['Tamamland?', 'Tamamland\u0131'],
  ['FATURA OLU?TUR', 'FATURA OLU\u015eTUR'],
  ['FATURAYI G?R?NT?LE', 'FATURAYI G\u00d6R\u00dcNT\u00dcLE'],
  ['DAHA FAZLA S?PAR?? Y?KLE', 'DAHA FAZLA S\u0130PAR\u0130\u015e Y\u00dcKLE'],
  ['YEN? S?PAR??', 'YEN\u0130 S\u0130PAR\u0130\u015e'],
  ['S?STEM KAYIT PANEL?', 'S\u0130STEM KAYIT PANEL\u0130'],
  ['M??teri Se?imi', 'M\u00fc\u015fteri Se\u00e7imi'],
  ['?sim, Telefon veya Eski No ile ara...', '\u0130sim, Telefon veya Eski No ile ara...'],
  ['M??teri bulunamad?', 'M\u00fc\u015fteri bulunamad\u0131'],
  ['Sipari? ??eri?i', 'Sipari\u015f \u0130\u00e7eri\u011fi'],
  ['+ ?r?n Ekle', '+ \u00dcr\u00fcn Ekle'],
  ['?r?n Se?iniz...', '\u00dcr\u00fcn Se\u00e7iniz...'],
  ['Atanmad?', 'Atanmad\u0131'],
  ['?deme', '\u00d6deme'],
  ['S?PAR?? OLU?TUR', 'S\u0130PAR\u0130\u015e OLU\u015eTUR'],
  ['Durum G?ncelleme', 'Durum G\u00fcncelleme'],
  ['Toplam Tutar (?)', 'Toplam Tutar (\u20ba)'],
  ['CANLI TAK', 'CANLI TAK\u0130P'],
  ['Var??', 'Var\u0131\u015f'],
  ['İstanbul Merkez', '\u0130stanbul Merkez'],
  ['0stanbul Merkez', '\u0130stanbul Merkez'],
]);

const GENERIC_REPLACEMENTS = [
  ['Ã¼', '\u00fc'],
  ['Ãœ', '\u00dc'],
  ['Ã¶', '\u00f6'],
  ['Ã–', '\u00d6'],
  ['Ã§', '\u00e7'],
  ['Ã‡', '\u00c7'],
  ['Ä±', '\u0131'],
  ['Ä°', '\u0130'],
  ['ÅŸ', '\u015f'],
  ['Åž', '\u015e'],
  ['ÄŸ', '\u011f'],
  ['Äž', '\u011e'],
  ['â‚º', '\u20ba'],
  ['Ã¼', '\u00fc'],
  ['Ãœ', '\u00dc'],
  ['Ã¶', '\u00f6'],
  ['Ã–', '\u00d6'],
  ['Ã§', '\u00e7'],
  ['Ã‡', '\u00c7'],
  ['Ä±', '\u0131'],
  ['Ä°', '\u0130'],
  ['ÅŸ', '\u015f'],
  ['Åž', '\u015e'],
  ['ÄŸ', '\u011f'],
  ['Äž', '\u011e'],
];

function normalizeTurkishText(value) {
  if (!value || typeof value !== 'string') return value;

  let next = value;

  for (const [from, to] of EXACT_REPLACEMENTS) {
    if (next.includes(from)) {
      next = next.split(from).join(to);
    }
  }

  for (const [from, to] of GENERIC_REPLACEMENTS) {
    if (next.includes(from)) {
      next = next.split(from).join(to);
    }
  }

  return next;
}

function normalizeNodeText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const normalized = normalizeTurkishText(node.nodeValue);
    if (normalized !== node.nodeValue) {
      node.nodeValue = normalized;
    }
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;

  const attrs = ['title', 'placeholder', 'aria-label'];
  for (const attr of attrs) {
    const current = node.getAttribute(attr);
    if (!current) continue;
    const normalized = normalizeTurkishText(current);
    if (normalized !== current) {
      node.setAttribute(attr, normalized);
    }
  }

  for (const child of node.childNodes) {
    normalizeNodeText(child);
  }
}

export function installTurkishTextFixer(root = document.body) {
  if (!root) return () => {};

  normalizeNodeText(root);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        normalizeNodeText(mutation.target);
        continue;
      }

      mutation.addedNodes.forEach((node) => normalizeNodeText(node));
    }
  });

  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
  });

  return () => observer.disconnect();
}
