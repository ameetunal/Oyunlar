// Kaptan-ı derya/denizci profil verisi. Anahtarlar admirals.js içindeki
// "name" alanıyla birebir eşleşir. Her profil bir bilgi kutusu (doğum/
// ölüm, kökeni, dönemi, başlıca zaferleri, mirası) ve ardından hayatını
// anlatan 2 paragraflık bir metin içerir.
export const admiralProfiles = {
  'Barbaros Hayreddin Paşa': {
    born: '1478 civarı, Midilli',
    died: '1546, İstanbul',
    origin: 'Rum asıllı bir sipahinin oğlu; korsanlıkla başlayan denizcilik kariyeri',
    era: 'Kanuni Sultan Süleyman dönemi',
    majorVictories: 'Preveze Deniz Savaşı (1538), Cezayir ve Tunus\'un Osmanlı hakimiyetine katılması',
    legacy: 'Akdeniz\'de bir asra yakın sürecek Osmanlı deniz üstünlüğünün mimarı',
    text: `Barbaros Hayreddin Paşa, kardeşi Oruç Reis'le birlikte önce Kuzey Afrika kıyılarında bağımsız bir korsan-denizci olarak ün kazandı; Cezayir ve çevresindeki İspanyol varlığına karşı verdikleri mücadele, onları yerel halkın gözünde birer kurtarıcı haline getirdi. Kanuni Sultan Süleyman'ın daveti üzerine 1533'te İstanbul'a gelerek kaptan-ı deryalığa (donanma komutanlığına) getirildi.

1538'deki Preveze Deniz Savaşı, kariyerinin zirve noktasıydı: Venedik, Papalık, İspanya ve diğer Avrupa güçlerinin oluşturduğu büyük bir Haçlı donanmasını, sayıca dezavantajlı olmasına rağmen taktik üstünlükle bozguna uğrattı. Bu zafer, Akdeniz'de yaklaşık bir asır sürecek kesintisiz bir Osmanlı deniz üstünlüğünün başlangıcı oldu. Barbaros'un "Barbaros Denizi" olarak da anılan Akdeniz'deki bu hakimiyeti, onu yalnızca Osmanlı'nın değil, dünya deniz tarihinin en efsanevi amirallerinden biri haline getirdi; İstanbul Beşiktaş'taki türbesi bugün hâlâ Türk Deniz Kuvvetleri'nin manevi merkezlerinden biri olarak kabul edilir.`,
  },

  'Turgut Reis': {
    born: '1485 civarı, Muğla',
    died: '1565, Malta (Malta Kuşatması sırasında)',
    origin: 'Anadolu\'lu bir aileden; Barbaros Hayreddin Paşa\'nın yanında yetişen denizci',
    era: 'Kanuni Sultan Süleyman ve II. Selim dönemleri',
    majorVictories: 'Kuzey Afrika kıyılarında (özellikle Trablusgarp) Osmanlı hakimiyetinin pekişmesi',
    legacy: 'Akdeniz\'in en korkulan denizcilerinden biri, adını taşıyan Trablusgarp (Libya) şehri Turgutlu ile anılır',
    text: `Turgut Reis (Avrupa kaynaklarında "Dragut" olarak anılır), Barbaros Hayreddin Paşa'nın yanında yetişerek denizcilik kariyerine başladı ve zamanla Kuzey Afrika kıyılarının en etkili ve en korkulan Osmanlı denizcilerinden biri haline geldi. İspanyol ve Cenevizli güçlere karşı yürüttüğü mücadelelerle, Trablusgarp'ın (bugünkü Libya) Osmanlı topraklarına katılmasını sağladı ve bölgenin ilk beylerbeyi oldu.

Otuz yılı aşkın denizcilik kariyeri boyunca Akdeniz'in batı ve orta kesimlerinde Osmanlı gücünü temsil eden Turgut Reis, 1565'teki büyük Malta Kuşatması sırasında, kuşatmayı bizzat yönetirken bir top güllesi isabetiyle şehit düştü. Ölümü, kuşatmanın Osmanlı için başarısızlıkla sonuçlanmasının önemli nedenlerinden biri olarak görülür. Trablusgarp'ta yaptırdığı cami ve kendi adını taşıyan defalarca anılan kalıcı miras, onu bölgenin en saygın Osmanlı figürlerinden biri yapar.`,
  },

  'Piyale Paşa': {
    born: '1515 civarı, muhtemelen Macaristan veya Hırvatistan kökenli devşirme',
    died: '1578, İstanbul',
    origin: 'Devşirme kökenli; enderun eğitimi almış bir denizci-devlet adamı',
    era: 'Kanuni Sultan Süleyman ve II. Selim dönemleri',
    majorVictories: 'Cerbe Deniz Savaşı (1560), Sakız Adası\'nın fethi (1566), Kıbrıs seferinde donanma komutanlığı',
    legacy: 'Cerbe zaferiyle İspanyol donanmasına Akdeniz\'de ağır bir darbe vuran, aynı zamanda Kanuni\'nin damadı olan kaptan-ı derya',
    text: `Piyale Paşa, enderun eğitiminden geçerek yetişen ve denizcilik kariyerinde hızla yükselen bir devşirmeydi; Kanuni Sultan Süleyman'ın kızı Gevherhan Sultan'la evlenerek de saraya damat olarak bağlandı. 1554'te kaptan-ı deryalığa getirildiğinde, Osmanlı donanmasının Akdeniz'deki etkinliğini daha da artıracak bir dönem başladı.

1560'taki Cerbe Deniz Savaşı'nda, Osmanlı'ya karşı toplanan büyük bir İspanyol-İtalyan donanmasını ağır bir yenilgiye uğrattı; bu zafer, Preveze'den sonra Akdeniz'deki Osmanlı üstünlüğünü bir kez daha teyit etti. 1566'da Sakız Adası'nı Cenevizlilerden alarak Ege'deki son büyük yabancı üssü de ortadan kaldırdı ve 1570-71'deki Kıbrıs seferinde de donanma komutanlığı yaptı. Piyale Paşa, hem askeri başarıları hem de sarayla kurduğu akrabalık bağıyla, 16. yüzyıl Osmanlı deniz gücünün en etkili isimlerinden biri olarak tarihe geçti.`,
  },

  'Salih Reis': {
    born: 'Bilinmiyor (16. yüzyıl başı)',
    died: '1568',
    origin: 'Barbaros Hayreddin Paşa\'nın yetiştirdiği denizcilerden',
    era: 'Kanuni Sultan Süleyman dönemi',
    majorVictories: 'Batı Akdeniz\'de İspanyol ve Cenevizli gemilere karşı düzenlediği seferler, Trablusgarp beylerbeyiliği',
    legacy: 'Barbaros ekolünün Batı Akdeniz\'deki gücünü sürdüren, döneminin saygın kaptan-ı deryalarından biri',
    text: `Salih Reis, Barbaros Hayreddin Paşa'nın yetiştirdiği kuşağın önemli isimlerinden biriydi ve hocasının izinden giderek Batı Akdeniz'de Osmanlı deniz gücünün sürekliliğini sağladı. İspanyol ve Cenevizli ticaret ve savaş gemilerine karşı düzenlediği seferlerle bölgede uzun süre etkili bir varlık gösterdi.

Turgut Reis'in ardından bir dönem Trablusgarp beylerbeyiliği de yapan Salih Reis, kariyerinin ilerleyen döneminde kaptan-ı deryalığa kadar yükseldi. Onun gibi Barbaros'un yetiştirdiği denizcilerin -Turgut Reis, Salih Reis, Piyale Paşa gibi- bir kuşak boyunca Akdeniz'de görev almaya devam etmesi, Barbaros'un yalnızca kendi döneminde değil, yetiştirdiği isimler aracılığıyla da Osmanlı deniz gücüne onlarca yıl süren bir miras bıraktığını gösterir.`,
  },

  'Seydi Ali Reis': {
    born: 'Bilinmiyor, İstanbul kökenli',
    died: '1562, İstanbul',
    origin: 'Tersane çevresinde yetişmiş, aynı zamanda şair ve yazar bir denizci',
    era: 'Kanuni Sultan Süleyman dönemi',
    majorVictories: 'Hint Okyanusu\'ndaki Osmanlı donanmasının Basra\'dan geri getirilmesi görevi',
    legacy: 'Denizcilik serüvenini edebi bir eserde ölümsüzleştiren, hem denizci hem yazar kimliğiyle öne çıkan isim',
    text: `Seydi Ali Reis, Kanuni Sultan Süleyman tarafından, Basra'da bulunan ve Portekizlilere karşı savaşlarda yıpranmış bir Osmanlı donanmasını İstanbul'a geri getirmekle görevlendirildi. Ancak bu yolculuk, fırtınalar, Portekiz saldırıları ve teknik sorunlar yüzünden son derece zorlu ve uzun bir maceraya dönüştü; gemilerinin çoğunu kaybederek Hindistan, Afganistan ve İran üzerinden kara yoluyla İstanbul'a dönmek zorunda kaldı.

Bu olağanüstü yolculuğu, Mir'atü'l-Memalik ("Ülkelerin Aynası") adlı eserinde ayrıntılı biçimde anlattı; bu kitap, hem bir denizcilik hem bir seyahat anlatısı olarak, 16. yüzyıl Hint Okyanusu ve Orta Asya coğrafyası hakkında değerli bilgiler sunar. Seydi Ali Reis ayrıca "Katibi" mahlasıyla şiirler de yazmıştır; bu yönüyle o, Osmanlı denizcilik tarihinde hem pratik deniz bilgisini hem edebi yeteneği bir arada taşıyan nadir isimlerden biridir.`,
  },

  'Uluç Ali Reis (Kılıç Ali Paşa)': {
    born: '1519 civarı, Kalabria (İtalya) kökenli',
    died: '1587, İstanbul',
    origin: 'İtalyan asıllı, esir düşüp Müslüman olan ve denizcilikte yükselen bir devşirme',
    era: 'II. Selim ve III. Murad dönemleri',
    majorVictories: 'İnebahtı bozgunundan (1571) sonra donanmayı tek yıl içinde yeniden inşa etmesi, Tunus\'un yeniden fethi',
    legacy: 'Osmanlı\'nın en ağır deniz yenilgisinin ardından donanmayı yeniden ayağa kaldıran isim',
    text: `Aslen İtalyan bir balıkçı ailesinden gelen Uluç Ali Reis, bir Osmanlı akınında esir düşüp Müslüman olduktan sonra denizcilik kariyerinde hızla yükseldi ve "Uluç" (dönme) lakabıyla anılan bu geçmişine rağmen kaptan-ı deryalığa kadar geldi. 1571'deki İnebahtı Deniz Savaşı'nda, Osmanlı donanmasının büyük bölümü yok olurken, komuta ettiği sol kanadı ustalıkla kurtararak Haçlı ittifakına karşı tek başarılı manevrayı gerçekleştirdi.

Bu bozgunun ardından Sokullu Mehmed Paşa'nın "sakalı kesildi ama kol yeniden çıkmaz" sözleriyle özetlediği kararlılıkla, Uluç Ali Reis'e (bu başarısından sonra "Kılıç Ali Paşa" unvanını aldı) donanmayı yeniden inşa etme görevi verildi; bu görevi bir yıl içinde başarıyla tamamlayarak Osmanlı deniz gücünün Akdeniz'deki varlığını sürdürmesini sağladı. Tophane'de bugün de ayakta olan Kılıç Ali Paşa Camii, Mimar Sinan'ın son büyük eserlerinden biri olarak, onun adına ve mirasına inşa edildi.`,
  },

  'Cezayirli Gazi Hasan Paşa': {
    born: '1713 civarı, Rumeli kökenli',
    died: '1790, Halep (bir sefer sırasında)',
    origin: 'Genç yaşta Cezayir\'e giderek denizcilik öğrenen, kökeni belirsiz bir devlet adamı',
    era: 'III. Mustafa ve I. Abdülhamid dönemleri',
    majorVictories: 'Çeşme faciasından sonra donanmanın yeniden inşası, Mora İsyanı\'nın bastırılmasına katkı',
    legacy: '18. yüzyılın en yetenekli Osmanlı denizcisi, "sadık aslanı" efsanesiyle de anılan kaptan-ı derya',
    text: `Cezayirli Gazi Hasan Paşa, gençliğinde Cezayir'e giderek orada denizcilik ve askeri tecrübe kazandı, "Cezayirli" lakabı da buradan gelir. 1770'te Osmanlı donanmasının Çeşme'de Rus donanması tarafından neredeyse tamamen yakılmasının ardından, devletin deniz gücünü yeniden inşa etme görevi büyük ölçüde ona verildi.

Hasan Paşa, hem gemi inşa programlarını hızlandırdı hem de mürettebat eğitimini yeniden düzenleyerek Osmanlı donanmasını bir on yıl içinde toparladı; bu çabası, 1787-1792 Osmanlı-Rus savaşında donanmanın yeniden etkin biçimde sahaya çıkabilmesini sağladı. Yanından hiç ayırmadığı evcil bir aslanla dolaştığı rivayeti, onu halk arasında efsanevi bir figüre dönüştürdü. Kaptan-ı deryalığın yanı sıra kısa bir dönem sadrazamlık da yapan Hasan Paşa, 18. yüzyılın en yetenekli ve en sevilen Osmanlı devlet adamlarından biri olarak anılır.`,
  },
};
