// Sadrazam profil verisi. Anahtarlar viziers.js içindeki "name" alanıyla
// birebir eşleşir. Her profil bir bilgi kutusu (doğum/ölüm, kökeni, hizmet
// ettiği padişahlar, önemli icraatları, görevin sonu) ve ardından hayatını,
// kariyerini ve mirasını anlatan 2-3 paragraflık bir metin içerir.
export const vizierProfiles = {
  'Çandarlı Kara Halil Hayreddin Paşa': {
    born: 'Bilinmiyor (14. yüzyıl başı, Bilecik yöresi)',
    died: '1387, Edirne',
    origin: 'Türk asıllı; Çandarlı ailesinin kurucusu, kadılık ve kazaskerlik geçmişi olan bir ilmiye mensubu',
    servedSultans: 'I. Murad',
    notableWorks: 'Yeniçeri Ocağı\'nın kuruluşuna öncülük etti, ilmiye teşkilatını düzenledi, "sadrazam" makamını kurumsal bir yapıya kavuşturdu',
    end: 'Görevdeyken vefat etti; makam oğlu Ali Paşa\'ya geçerek Çandarlı ailesinde kalıcı hale geldi',
    text: `Kara Halil Paşa, henüz beylik ölçeğinde bir devletken Osmanlı'yı kurumsallaştıran isimdi. Kadılık ve kazaskerlik görevlerinde edindiği hukuk bilgisiyle I. Murad'ın en güvendiği danışmanı oldu; 1364 civarında "vezir-i azam" unvanını fiilen daimi bir makama dönüştüren ilk kişi kabul edilir. Ondan önce vezirlik geçici bir görevlendirmeyken, Kara Halil Paşa'yla birlikte sadrazamlık sürekli, hiyerarşik bir devlet makamına dönüştü.

Onun en kalıcı mirası askeri ve idari alanda oldu: pençik sistemiyle toplanan devşirmelerden oluşan Yeniçeri Ocağı'nın kurulmasına öncülük etti ve medrese-kadılık zincirine dayanan ilmiye teşkilatının temellerini attı. Bu iki kurum, yüzyıllarca Osmanlı Devleti'nin bel kemiği olacaktı. Oğlu Çandarlı Ali Paşa'nın da sadrazam olmasıyla, Çandarlı ailesi bir asrı aşkın süre bu makamı adeta tekeline aldı.`,
  },

  'Çandarlı Ali Paşa': {
    born: 'Bilinmiyor (14. yüzyıl ortası)',
    died: '1406',
    origin: 'Çandarlı ailesinden; Kara Halil Paşa\'nın oğlu',
    servedSultans: 'I. Bayezid (Yıldırım)',
    notableWorks: 'Niğbolu Savaşı\'nda ordunun sevk ve idaresinde görev aldı, Anadolu\'da beylikler üzerindeki merkezi otoriteyi güçlendirdi',
    end: 'Ankara Savaşı bozgunu ve Fetret Devri kargaşasının ardından, kaynaklara göre 1406\'da vefat etti',
    text: `Babasının kurduğu düzeni devralan Ali Paşa, Yıldırım Bayezid'in en hızlı büyüme dönemine sadrazamlık yaptı. Anadolu beyliklerinin Osmanlı'ya katılması ve 1396'daki Niğbolu Savaşı'nda Haçlı ordusuna karşı kazanılan büyük zaferde etkin rol oynadı; bu zafer Osmanlı'yı Avrupa'da ciddi bir güç olarak tescillemişti.

Ancak 1402'de Ankara Savaşı'nda Timur karşısında alınan ağır yenilgi, hem Bayezid'in hem de devletin geleceğini karartacaktı. Ali Paşa bu bozgunun ardından gelen kaotik Fetret Devri'nde etkisini büyük ölçüde yitirdi. Kariyeri, bir devletin en parlak yükselişiyle en ağır çöküş anı arasındaki keskin dönüşün simgesi gibidir.`,
  },

  'Çandarlı Halil Paşa (Genç)': {
    born: 'Bilinmiyor (15. yüzyıl başı)',
    died: '1453, İstanbul\'un fethinin ardından',
    origin: 'Çandarlı ailesinden; ailenin üçüncü kuşak sadrazamı',
    servedSultans: 'II. Murad, II. Mehmed (Fatih)',
    notableWorks: 'II. Murad döneminde devlet işlerini istikrarla yönetti; Fatih\'in tahta ilk çıkışında (1444-46) tecrübesiyle devleti ayakta tuttu',
    end: 'İstanbul kuşatmasına açıkça karşı çıktığı ve Bizans ile gizli ilişkilerle suçlandığı için fetihten kısa süre sonra II. Mehmed tarafından idam edildi',
    text: `Çandarlı Halil Paşa, II. Murad'ın güvenilir sadrazamıydı ve genç yaştaki II. Mehmed ilk kez tahta çıktığında (1444-1446) tecrübesiyle devleti bir arada tuttu. Ancak Fatih'in İstanbul'u fethetme konusundaki kararlılığına en sert itiraz eden isim de oydu; Bizans'la barışın sürdürülmesini, büyük bir kuşatmanın riskli olduğunu savunuyordu.

Bu görüş ayrılığı, genç ve azimli padişah ile tecrübeli ama temkinli sadrazam arasında derin bir güvensizliğe dönüştü. İstanbul 1453'te fethedildikten kısa süre sonra Halil Paşa görevden alındı, Bizans'la gizlice haberleştiği iddiasıyla tutuklandı ve idam edildi. Onun ölümüyle, bir asrı aşkın süredir sadrazamlığı elinde tutan Çandarlı ailesinin bu makamdaki hâkimiyeti de sona ermiş oldu.`,
  },

  'Mahmud Paşa Angelović': {
    born: 'Yaklaşık 1420, Sırbistan (Novo Brdo)',
    died: '1474, idam',
    origin: 'Sırp-Bizans kökenli bir aileden devşirme; Fatih\'in sarayında yetişti',
    servedSultans: 'II. Mehmed (Fatih)',
    notableWorks: 'Sırbistan ve Mora\'nın fethini yönetti, Boğdan ve Eflak seferlerinde bulundu, Fatih Kanunnamesi\'nin hazırlanmasına katkı sağladı',
    end: 'Görevden azledilip yeniden atandıktan sonra, 1474\'te bir sefer dönüşü Fatih\'in emriyle idam edildi',
    text: `Devşirme kökenli olmasına rağmen Fatih Sultan Mehmed'in en yakın ve en yetenekli devlet adamlarından biri haline gelen Mahmud Paşa, hem seçkin bir kumandan hem de ince bir diplomattı. Sırbistan'ın ve Mora Yarımadası'nın Osmanlı topraklarına katılmasında, Eflak ve Boğdan üzerindeki Osmanlı nüfuzunun pekişmesinde doğrudan rol oynadı.

Fatih'in güvenini iki kez kazanıp iki kez kaybeden Mahmud Paşa, 1466'da bir süre görevden alındı, ardından 1472'de yeniden sadrazam yapıldı. Ama Fatih'in sert ve değişken mizacı onun sonunu da getirdi: 1474'te bir Boğdan seferi dönüşünde, tam olarak netleşmemiş bir gerekçeyle idam edildi. Buna rağmen kendisi, kurduğu vakıflar ve İstanbul'daki Mahmud Paşa Camii ile şehirde iz bırakan devlet adamlarından biri olarak hatırlanır.`,
  },

  'Sokullu Mehmed Paşa': {
    born: '1505, Bosna (Sokolovići)',
    died: '1579, İstanbul, suikast sonucu',
    origin: 'Boşnak kökenli devşirme; sarayda enderun eğitimi aldı',
    servedSultans: 'Kanuni Sultan Süleyman, II. Selim, III. Murad',
    notableWorks: 'Don-Volga ve Süveyş kanalı projelerini gündeme getirdi, İnebahtı yenilgisinden sonra donanmayı hızla yeniden inşa etti, Kıbrıs\'ın fethini yönetti',
    end: 'İstanbul\'da bir divan toplantısı sırasında, kimliği tam netleşmemiş bir suikastçı tarafından bıçaklanarak öldürüldü',
    text: `Sokullu Mehmed Paşa, Osmanlı tarihinin belki de en etkili sadrazamıdır: on dört yıl kesintisiz görevde kaldı ve üç farklı padişaha hizmet etti. Kanuni'nin son yıllarında devlet işlerinin fiilen büyük kısmını o yürütüyordu; II. Selim ve genç III. Murad dönemlerinde ise imparatorluğun gerçek yöneticisi konumundaydı.

Vizyoner bir devlet adamıydı: Volga ve Don nehirlerini birbirine bağlayacak bir kanal, hatta Süveyş'te bir su yolu gibi cüretkâr projeler öne sürdü. 1571'de İnebahtı'da Osmanlı donanması ağır bir darbe alınca, "biz sizin sakalınızı kestik, siz bizim kolumuzu kestiniz, sakal yeniden çıkar ama kol çıkmaz" sözleriyle özetlenen bir azimle donanmayı bir yıl içinde yeniden inşa ettirdi. 1579'da, sebebi tam aydınlatılamayan bir suikastla öldürülmesi, birçok tarihçi tarafından Osmanlı'nın "klasik çağının" fiilen kapanışı olarak yorumlanır.`,
  },

  'Kuyucu Murad Paşa': {
    born: 'Yaklaşık 1535',
    died: '1611, İstanbul (görevdeyken, doğal ölüm)',
    origin: 'Devşirme kökenli; adını Celali isyancılarını öldürüp kuyulara doldurttuğu rivayetinden alır',
    servedSultans: 'I. Ahmed',
    notableWorks: 'Anadolu\'yu yıllarca kasıp kavuran Celali isyanlarını büyük ölçüde bastırdı, Bağdat çevresinde Osmanlı otoritesini yeniden tesis etti',
    end: 'İleri yaşta, bir sefer sırasında görevdeyken hastalanarak vefat etti',
    text: `16. yüzyılın son çeyreğinden itibaren Anadolu, "Celali isyanları" adı verilen bir dizi eşkıyalık ve ayaklanma dalgasıyla neredeyse yönetilemez hale gelmişti. I. Ahmed'in yaşlı ama son derece sert bir komutan olan Kuyucu Murad Paşa'yı sadrazamlığa getirmesi, bu krizi çözme kararlılığının bir göstergesiydi.

Murad Paşa, isyancılara karşı acımasız bir sertlikle hareket etti; ele geçirdiği asileri toplu halde idam ettirip cesetlerini kuyulara doldurttuğu için "Kuyucu" lakabını aldı. Yöntemleri ağır eleştirilere konu olsa da, birkaç yıl içinde Anadolu'daki otorite boşluğunu büyük ölçüde kapattı ve merkezi devletin gücünü yeniden tesis etti. Seksenli yaşlarında, bir Bağdat seferi sırasında görevdeyken hayatını kaybetti.`,
  },

  'Köprülü Mehmed Paşa': {
    born: 'Yaklaşık 1575, Arnavutluk',
    died: '1661, İstanbul (görevdeyken, doğal ölüm)',
    origin: 'Arnavut kökenli devşirme; sadrazamlığa geldiğinde seksenli yaşlardaydı',
    servedSultans: 'IV. Mehmed (Avcı)',
    notableWorks: 'Devlet hazinesini ve orduyu neredeyse çöküşün eşiğinden geri çevirdi, isyanları bastırdı, donanmayı yeniden düzenledi',
    end: 'İleri yaşına rağmen görevdeyken vefat etti; yerine oğlu Fazıl Ahmed Paşa geçti',
    text: `17. yüzyılın ortasında Osmanlı Devleti; hazine iflasın eşiğinde, taşrada isyanlar yaygın, merkezi otorite ise saray entrikalarıyla felç olmuş durumdaydı. Genç IV. Mehmed'in annesi Turhan Sultan, çözümü seksenli yaşlarındaki tecrübeli devlet adamı Köprülü Mehmed Paşa'yı sadrazam yaparak aradı — ancak paşa göreve ancak sınırsız yetki şartıyla razı oldu.

Bu yetkiyle Köprülü Mehmed Paşa acımasız ama etkili bir reform dönemi başlattı: yolsuzluğa bulaşan yüzlerce kişiyi idam ettirdi, hazineyi düzene soktu, isyanları bastırdı ve donanmayı yeniden inşa etti. Sadece beş yıl görevde kalmasına rağmen attığı temeller, oğlu Fazıl Ahmed Paşa ve torunlarıyla bir asra yakın sürecek "Köprülüler Devri"nin başlangıcı oldu — Osmanlı'nın duraklama döneminde bir nefeslenme evresi olarak görülür.`,
  },

  'Köprülüzade Fazıl Ahmed Paşa': {
    born: '1635, Anadolu',
    died: '1676, İstanbul (görevdeyken, doğal ölüm)',
    origin: 'Köprülü Mehmed Paşa\'nın oğlu; medrese eğitimi almış, ilmiye kökenli bir devlet adamı',
    servedSultans: 'IV. Mehmed (Avcı)',
    notableWorks: 'Girit\'in fethini yirmi dört yıl süren kuşatmanın ardından tamamladı, Kamaniçe ve Podolya\'yı fethetti',
    end: 'Görevdeyken, kırk bir yaşında hastalanarak vefat etti',
    text: `Babasının aksine medrese kökenli bir ilim adamı olarak yetişen Fazıl Ahmed Paşa, yirmi altı yaşında sadrazam olduğunda hem askeri hem entelektüel açıdan döneminin en donanımlı devlet adamlarından biriydi. Babasının kurduğu disiplinli yönetim anlayışını sürdürdü ve on beş yıl kesintisiz görevde kaldı.

En büyük başarısı, 1645'ten beri aralıklarla süren ve Venedik'le Osmanlı'yı yıpratan Girit Savaşı'nı 1669'da Kandiye'nin (Heraklion) fethiyle sonuçlandırmak oldu. Ardından Lehistan'a yönelerek Kamaniçe ve Podolya'yı Osmanlı topraklarına kattı, bu dönem imparatorluğun toprak açısından en geniş sınırlarına ulaştığı yıllara denk gelir. Erken yaşta, kırk bir yaşındayken vefatı, Köprülüler Devri'nin istikrarlı ikinci evresini de kapatmış oldu.`,
  },

  'Merzifonlu Kara Mustafa Paşa': {
    born: '1634 veya 1635, Merzifon',
    died: '1683, Belgrad, idam',
    origin: 'Köprülü ailesinin himayesinde yetişmiş bir devşirme; Köprülü Mehmed Paşa\'nın evlatlığı',
    servedSultans: 'IV. Mehmed (Avcı)',
    notableWorks: 'Çehrin seferini yönetti, Osmanlı\'nın son büyük saldırı hamlesi olan II. Viyana Kuşatması\'nı başlattı',
    end: 'Viyana bozgunundan sorumlu tutularak, IV. Mehmed\'in fermanıyla Belgrad\'da boğdurularak idam edildi',
    text: `Köprülü ailesinin himayesinde yetişen Kara Mustafa Paşa, 1676'da sadrazam olduğunda Köprülüler geleneğinin son büyük temsilcisiydi. Ancak selefi Fazıl Ahmed Paşa'nın temkinli genişleme politikasından farklı olarak, çok daha cüretkâr — bazı tarihçilere göre gözü kara — bir dış politika izledi.

1683'te devasa bir orduyla Habsburg başkenti Viyana'yı kuşatması, Osmanlı'nın Avrupa'ya yönelik son büyük saldırı hamlesiydi ve şehri neredeyse iki ay boyunca teslim olmanın eşiğine getirdi. Ne var ki Polonya kralı III. Jan Sobieski komutasındaki yardım ordusunun ani saldırısı kuşatmayı bir bozguna çevirdi. Bu ağır yenilginin sorumluluğu tamamen Kara Mustafa Paşa'ya yüklendi; IV. Mehmed'in fermanıyla Belgrad'da idam edildi. Bu bozgun, tarihçilerin genel kabulüyle Osmanlı'nın Avrupa'daki gerileme sürecinin de sembolik başlangıcı sayılır.`,
  },

  'Damat İbrahim Paşa (Nevşehirli)': {
    born: '1666, Nevşehir',
    died: '1730, İstanbul, linç',
    origin: 'Anadolu\'lu bir ailede doğdu, sarayda yükseldi, III. Ahmed\'in kızıyla evlenerek "damat" unvanını aldı',
    servedSultans: 'III. Ahmed',
    notableWorks: 'Barışçıl bir dış politika izledi, İbrahim Müteferrika\'nın ilk Türk matbaasını açmasına destek verdi, İstanbul\'da imar ve lale bahçeleriyle bilinen "Lale Devri"ni başlattı',
    end: 'Patrona Halil İsyanı sırasında ayaklanan halk ve yeniçeriler tarafından yakalanıp linç edildi',
    text: `Damat İbrahim Paşa'nın on iki yıllık sadrazamlığı, Osmanlı tarihine "Lale Devri" olarak geçen, savaşların nispeten durduğu, sarayın ve İstanbul seçkinlerinin Batı'daki (özellikle Fransa'daki) yaşam tarzı ve estetiğine ilgi duyduğu bir döneme denk gelir. Elçiler Avrupa başkentlerine gönderildi, köşkler ve lale bahçeleriyle süslü eğlence kültürü gelişti.

Bu dönemin en kalıcı mirası ise kültürel oldu: İbrahim Müteferrika'nın öncülüğünde 1727'de kurulan ilk Türk matbaası, Osmanlı'da bilgiye erişimi kalıcı biçimde değiştirecek bir adımdı. Ancak bu görkemli ama pahalı yaşam tarzı, artan vergiler ve İran cephesindeki başarısızlıklarla birleşince halk ve yeniçiler arasında büyük bir öfke birikti. 1730'da patlak veren Patrona Halil İsyanı'nda İbrahim Paşa yakalanıp linç edildi; III. Ahmed de tahttan indirildi.`,
  },

  'Koca Yusuf Paşa': {
    born: 'Yaklaşık 1730, Gürcistan',
    died: '1800',
    origin: 'Gürcü kökenli devşirme',
    servedSultans: 'I. Abdülhamid, III. Selim',
    notableWorks: 'Zorlu bir Osmanlı-Rus-Avusturya savaşı döneminde orduyu ve diplomasiyi yönetti, Ziştovi Antlaşması sürecine katkı sağladı',
    end: 'Görevden azledildikten sonra sürgüne gönderildi, 1800\'de vefat etti',
    text: `Koca Yusuf Paşa, Osmanlı'nın hem Rusya hem Avusturya ile aynı anda savaştığı son derece zorlu bir dönemde iki farklı kez sadrazamlık yaptı. İlk döneminde (1786-1789) savaşın kötü gidişatından sorumlu tutularak görevden alındı, ancak kısa süre sonra tecrübesine yeniden ihtiyaç duyularak 1791'de göreve döndürüldü.

İkinci döneminde, Osmanlı'yı ağır kayıplardan kurtaracak bir barışın zeminini hazırlamaya çalıştı; bu çabalar onun görevden ayrılışından kısa süre sonra 1791 Ziştovi ve 1792 Yaş antlaşmalarıyla sonuçlandı. Kariyeri, 18. yüzyıl sonunda Osmanlı sadrazamlarının sık sık göreve gelip gittiği, savaş yorgunu ve mali sıkıntı içindeki bir devletin yönetim istikrarsızlığını da gözler önüne serer.`,
  },

  'Alemdar Mustafa Paşa': {
    born: '1765 civarı, Hotin (bugünkü Ukrayna)',
    died: '1808, İstanbul, isyan sırasında',
    origin: 'Rumeli\'de ayan (yerel güç sahibi) olarak yükselmiş bir asker',
    servedSultans: 'II. Mahmud',
    notableWorks: 'III. Selim\'i tahta geri getirmek için İstanbul\'a yürüdü, geç kaldığında II. Mahmud\'u tahta çıkardı, ayanlarla merkezi hükümet arasında Sened-i İttifak\'ı imzalattı',
    end: 'Sadrazamlığının yedinci ayında, yeniçerilerin çıkardığı bir isyanda sarayının kuşatılması sonucu öldü',
    text: `Alemdar Mustafa Paşa, Rusçuk ayanı olarak Tuna boylarında güçlü bir asker-yönetici konumuna gelmişti. 1807'de yeniçerilerin III. Selim'i tahttan indirmesi üzerine, reformcu padişahı yeniden tahta çıkarmak amacıyla ordusuyla İstanbul'a yürüdü; ancak şehre vardığında III. Selim'in öldürülmüş olduğunu gördü ve bunun yerine genç şehzade II. Mahmud'u tahta çıkardı.

Sadrazam olduktan sonra, merkezi hükümetle taşradaki güçlü ayanlar arasında bir denge kurmayı amaçlayan Sened-i İttifak'ı imzalattı — bu belge bazı tarihçilerce Osmanlı'da anayasacılığın ilk emaresi olarak yorumlanır. Ancak reform girişimleri ve yeniçerileri tasfiye çabaları büyük bir tepkiyle karşılandı; göreve gelişinden yalnızca yedi ay sonra çıkan bir yeniçeri isyanında sarayı kuşatıldı ve isyancılar tarafından öldürüldü.`,
  },

  'Mustafa Reşid Paşa': {
    born: '1800, İstanbul',
    died: '1858, İstanbul (görev dışında, doğal ölüm)',
    origin: 'Orta halli bir memur ailesinden; kalemiye (bürokrasi) yoluyla yükseldi, Paris ve Londra büyükelçilikleri yaptı',
    servedSultans: 'Abdülmecid',
    notableWorks: 'Tanzimat Fermanı\'nı kaleme aldı ve ilan ettirdi, Osmanlı diplomasisini Avrupa\'ya açtı, altı kez sadrazamlık yaptı',
    end: 'Son sadrazamlık döneminden sonra görevdeyken değil, emeklilik sürecinde vefat etti',
    text: `Mustafa Reşid Paşa, klasik Osmanlı bürokrasisinden çok Avrupa başkentlerindeki büyükelçilik deneyimiyle şekillenmiş yeni tip bir devlet adamıydı. Londra ve Paris'te geçirdiği yıllar, ona Osmanlı'nın Avrupa karşısındaki askeri ve idari geri kalmışlığını yakından gösterdi ve reform konusunda derin bir inanç kazandırdı.

1839'da Abdülmecid'in cülusunun hemen ardından kaleme aldığı Gülhane Hatt-ı Hümayunu (Tanzimat Fermanı), Osmanlı tebaasının can, mal ve namus güvenliğini, vergi ve askerlikte adaleti ilke olarak benimsiyordu — bu, imparatorluğun modern anlamda hukuk devletine doğru attığı ilk büyük adımdı. Sonraki yirmi yıl boyunca altı kez sadrazamlığa gelip gitti; her seferinde Tanzimat reformlarını derinleştirmeye çalıştı ve döneminin en etkili batılılaşma taraftarı devlet adamı olarak anıldı.`,
  },

  'Mithat Paşa': {
    born: '1822, İstanbul',
    died: '1884, Taif (Arabistan), sürgünde öldürüldü',
    origin: 'Bir imamın oğlu; kalemiye yoluyla yükseldi, Tuna ve Bağdat valiliğindeki başarılı reformlarıyla tanındı',
    servedSultans: 'V. Murad, II. Abdülhamid',
    notableWorks: 'Osmanlı\'nın ilk anayasası Kanun-i Esasi\'yi hazırladı, I. Meşrutiyet\'in ilanına öncülük etti',
    end: 'II. Abdülhamid tarafından önce sürgüne gönderildi, sonra Yıldız Sarayı Baskını davasıyla yargılanıp Taif\'te öldürüldü',
    text: `Mithat Paşa, Tuna ve Bağdat vilayetlerindeki valiliği sırasında hayata geçirdiği yol, eğitim ve tarım reformlarıyla "reformcu vali" ününü kazanmıştı. II. Abdülhamid'in tahta çıkışının hemen öncesinde sadrazam olduğunda, Osmanlı aydınları arasında yıllardır tartışılan anayasal bir yönetime geçiş fikrini fiiliyata döktü.

1876'da ilan edilen Kanun-i Esasi ve onunla birlikte açılan Meclis-i Mebusan, Osmanlı'da ilk kez padişahın yetkilerini yazılı bir metinle sınırlandırıyordu — I. Meşrutiyet dönemi böyle başladı. Ancak II. Abdülhamid, 1877-78 Osmanlı-Rus Savaşı'nı bahane ederek kısa süre sonra hem meclisi hem anayasayı fiilen askıya aldı. Mithat Paşa önce sürgüne gönderildi, ardından tartışmalı bir yargılamayla suçlu bulunarak Taif'e sürüldü ve orada öldürüldü — anayasal Osmanlıcılığın öncü ismi, kurduğu düzenin yıkılışına da tanık olmadan hayatını kaybetti.`,
  },

  'Ahmed İzzet Paşa': {
    born: '1864, Manastır (bugünkü Kuzey Makedonya)',
    died: '1937, İstanbul',
    origin: 'Askeri kökenli; Harbiye mezunu, kariyer subayı ve Genelkurmay Başkanı',
    servedSultans: 'VI. Mehmed (Vahideddin)',
    notableWorks: 'I. Dünya Savaşı\'nın sonunu getiren Mondros Mütarekesi\'ni imzaladı',
    end: 'Mütarekenin ağır koşullarına tepki nedeniyle kısa süre sonra istifa etti',
    text: `Meslekten asker olan Ahmed İzzet Paşa, I. Dünya Savaşı'nın son aylarında, İttihat ve Terakki kadrolarının savaşı kaybettiğini kabul edip iktidarı bırakmasının ardından sadrazamlığa getirildi. Görevi, fiilen kaybedilmiş bir savaşın enkazını yönetmekti.

30 Ekim 1918'de Limni'nin Mondros Limanı'nda İtilaf Devletleri ile imzalanan mütareke, Osmanlı ordularının terhis edilmesini, boğazların açılmasını ve müttefik devletlere geniş işgal hakları tanınmasını öngörüyordu. Ahmed İzzet Paşa bu ağır şartları, savaşın artık sürdürülemez olduğu gerçeğiyle kabul etmek zorunda kaldığını belirtti; ancak mütarekenin yarattığı tepkiler ve giderek artan işgaller karşısında, imzaladığı belgenin sonuçlarını yönetmekte zorlanarak kısa süre içinde istifa etti.`,
  },

  'Ahmed Tevfik Paşa': {
    born: '1845, İstanbul',
    died: '1936, İstanbul',
    origin: 'Hariciyeci (dışişleri) kökenli; uzun yıllar Berlin büyükelçiliği yaptı',
    servedSultans: 'VI. Mehmed (Vahideddin)',
    notableWorks: 'Mütareke sonrası kaotik dönemde birden fazla kez sadrazamlık yaptı, İstanbul hükümetiyle Ankara arasındaki ilişkileri yönetmeye çalıştı',
    end: 'Saltanatın 1922\'de TBMM tarafından kaldırılmasıyla, tarihteki son Osmanlı sadrazamı olarak görevi sona erdi',
    text: `Uzun bir diplomatlık kariyerinin ardından sadrazamlığa gelen Ahmed Tevfik Paşa, imparatorluğun en karanlık ve belirsiz günlerinde göreve geldi: İstanbul işgal altındaydı, Anadolu'da ise Mustafa Kemal önderliğinde bağımsız bir ulusal hareket örgütleniyordu. 1918'de kısa bir dönem, ardından 1920'den itibaren tekrar sadrazamlık yaptı.

Bu ikinci ve son döneminde, İstanbul hükümeti ile Ankara'daki Büyük Millet Meclisi hükümeti arasında gidip gelen, giderek anlamını yitiren bir konumda kaldı. Türk Kurtuluş Savaşı'nın zaferle sonuçlanmasının ardından, 1 Kasım 1922'de TBMM'nin aldığı kararla saltanat kaldırıldı; bu karar Ahmed Tevfik Paşa'nın sadrazamlığını da otomatik olarak sona erdirdi. Böylece kendisi, 1364'ten beri altı buçuk asır süren bir makamın tarihteki son temsilcisi olarak tarihe geçti.`,
  },
};
