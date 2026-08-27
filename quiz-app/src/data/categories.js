// Quiz kategorileri. "playable: false" olanlar için soru bankası henüz
// hazır değil; Kategoriler ekranında "Yakında" olarak gösterilir.
export const categories = [
  { key: 'sultans', title: 'Padişahlar', subtitle: '36 padişah', playable: true },
  { key: 'viziers', title: 'Sadrazamlar', subtitle: '16 sadrazam', playable: true },
  { key: 'wars', title: 'Büyük Savaşlar', subtitle: '30 savaş', playable: true },
  { key: 'scientists', title: 'Bilim İnsanları', subtitle: '12 isim', playable: true },
  { key: 'architects', title: 'Mimarlar ve Sanatçılar', subtitle: '14 isim', playable: false },
  { key: 'dailyLife', title: 'Günlük Yaşam', subtitle: '10 konu', playable: false },
  { key: 'haremWomen', title: 'Kadın Sultanlar', subtitle: '8 sultan', playable: false },
  { key: 'admirals', title: 'Kaptan-ı Deryalar', subtitle: '7 denizci', playable: false },
  { key: 'poets', title: 'Divan Şairleri', subtitle: '6 şair', playable: false },
];
