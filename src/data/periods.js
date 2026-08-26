// Osmanlı tarihi içeriği: dönemler ve dönüm noktası olaylar.
// Belgesel/kitap anlatımı için hazırlanmıştır — oyunlaştırma (puan, seviye, quiz) yoktur.

export const periods = [
  {
    id: 'kurulus',
    title: 'Kuruluş Dönemi',
    range: '1299 – 1453',
    summary: 'Bir uç beyliğinden cihan devletine uzanan yolun ilk yüz elli yılı.',
    intro:
      'XIII. yüzyılın sonunda Anadolu, dağılan bir Selçuklu mirası ile Bizans\'ın çözülen sınır hattı arasında küçük Türkmen beyliklerine sahne oluyordu. Bu beyliklerden biri, Söğüt ve Domaniç yaylaları arasında sıkışmış, mütevazı bir uç beyliği olan Osmanlı, bir buçuk asır içinde önce Anadolu ve Rumeli\'de bir güç haline gelecek, sonra da Doğu Roma\'nın bin yıllık başkentini fethederek bir cihan devletine dönüşecekti.',
    events: [
      {
        year: '1299',
        title: 'Osmanlı Beyliği\'nin Kuruluşu',
        text: 'Söğüt merkezli küçük bir Türkmen uç beyliğinin başındaki Osman Bey, Selçuklu Devleti\'nin fiilen ortadan kalkmasıyla bağımsız hareket etmeye başladı. Bizans\'ın Anadolu\'daki tekfurluklarıyla mücadele ederek beyliğinin sınırlarını genişletti. Geleneksel olarak devletin kuruluş tarihi bu yıl kabul edilir; adını da kurucusu Osman Bey\'den alır.',
      },
      {
        year: '1326',
        title: 'Bursa\'nın Fethi',
        text: 'Osman Bey\'in oğlu Orhan Bey, uzun süren bir kuşatmanın ardından Bursa\'yı ele geçirdi ve şehri beyliğin ilk başkenti yaptı. Bursa\'nın alınması, Osmanlı\'nın artık geçici bir akıncı gücü değil, kalıcı bir devlet yapısına dönüştüğünün işaretiydi.',
      },
      {
        year: '1362',
        title: 'Edirne\'nin Fethi ve Rumeli\'ye Geçiş',
        text: 'I. Murad döneminde Osmanlı kuvvetleri Çanakkale Boğazı\'ndan Rumeli\'ye geçerek Balkanlar\'da kalıcı bir varlık kurdu. Edirne\'nin alınmasıyla şehir kısa süre içinde yeni başkent oldu; böylece Osmanlı hem Anadolu hem Avrupa yakasında topraklara sahip iki kıtalı bir devlete dönüştü.',
      },
      {
        year: '1389',
        title: 'I. Kosova Savaşı',
        text: 'Sırp Prensi Lazar öncülüğündeki Balkan ittifakı ile Osmanlı kuvvetleri Kosova ovasında karşı karşıya geldi. Savaş Osmanlı zaferiyle sonuçlandı, ancak I. Murad savaş alanında suikaste kurban giderek şehit düştü. Yerine oğlu I. Bayezid (Yıldırım) tahta çıktı.',
      },
      {
        year: '1402',
        title: 'Ankara Savaşı ve Fetret Devri',
        text: 'Doğudan gelen Timur\'un ordusuyla Yıldırım Bayezid\'in kuvvetleri Ankara yakınlarında çarpıştı. Osmanlı ordusu ağır bir yenilgi aldı, Bayezid esir düştü ve kısa süre sonra öldü. Bayezid\'in oğulları arasındaki taht kavgalarıyla geçen bu on bir yıllık kargaşa dönemine tarihte "Fetret Devri" denir; devlet parçalanmanın eşiğinden döndü.',
      },
      {
        year: '1413',
        title: 'Çelebi Mehmed ile Birliğin Sağlanması',
        text: 'Kardeşleri arasındaki mücadeleyi kazanan Çelebi Mehmed, Osmanlı topraklarını yeniden tek çatı altında topladı ve I. Mehmed unvanıyla tahta çıktı. Bu nedenle kendisine "İkinci Kurucu" da denir.',
      },
      {
        year: '1444',
        title: 'Varna Savaşı',
        text: 'II. Murad, Macar Kralı ve Polonya Kralı Vladislav önderliğindeki bir Haçlı ordusunu Varna\'da büyük bir yenilgiye uğrattı. Bu zafer, Osmanlı\'nın Balkanlar\'daki varlığını Haçlı seferleriyle sarsılmaz kılan dönüm noktalarından biri oldu.',
      },
      {
        year: '1453',
        title: 'İstanbul\'un Fethi',
        text: 'II. Mehmed, henüz yirmi bir yaşındayken elli üç gün süren bir kuşatmanın ardından Bizans\'ın bin yıllık başkenti Konstantinopolis\'i fethetti. Bu zaferle "Fatih" unvanını aldı ve şehir Osmanlı\'nın yeni başkenti oldu. İstanbul\'un fethi, Orta Çağ\'ın sonu ve Osmanlı\'nın bölgesel güçten cihan devletine dönüşümünün simgesi sayılır.',
      },
    ],
  },
  {
    id: 'yukselme',
    title: 'Yükselme Dönemi',
    range: '1453 – 1579',
    summary: 'Üç kıtaya yayılan sınırlar, güçlü bir merkezi devlet ve deniz üstünlüğü.',
    intro:
      'İstanbul\'un fethinden sonra Osmanlı, art arda gelen güçlü hükümdarlar eliyle Avrupa, Asya ve Afrika\'da sınırlarını genişletti. Yavuz Sultan Selim\'in doğu ve güney seferleri devletin topraklarını ve dini otoritesini büyütürken, oğlu Kanuni Sultan Süleyman döneminde Osmanlı hem karada hem denizde çağının en güçlü devleti haline geldi.',
    events: [
      {
        year: '1514',
        title: 'Çaldıran Savaşı',
        text: 'Yavuz Sultan Selim, Safevi hükümdarı Şah İsmail\'i Çaldıran\'da yenilgiye uğrattı. Bu zafer, Osmanlı\'nın Doğu Anadolu ve sonrasında Orta Doğu\'ya açılan yolunu açtı ve İran\'la olan uzun rekabetin ilk büyük perdesini oluşturdu.',
      },
      {
        year: '1517',
        title: 'Mısır\'ın Fethi ve Halifelik',
        text: 'Ridaniye Savaşı\'nda Memlük Devleti\'ni ortadan kaldıran Yavuz Sultan Selim, Mısır, Suriye, Hicaz ve kutsal şehirler Mekke ile Medine\'nin hâkimiyetini ele geçirdi. Geleneksel anlatıya göre halifelik unvanı da bu dönemde Osmanlı hanedanına geçti; devlet böylece İslam dünyasının siyasi ve manevi merkezlerinden biri haline geldi.',
      },
      {
        year: '1521',
        title: 'Belgrad\'ın Fethi',
        text: 'Kanuni Sultan Süleyman, tahta çıkışının hemen ardından stratejik öneme sahip Belgrad kalesini fethetti. Bu zafer, Orta Avrupa\'ya açılan kapıyı Osmanlı\'ya açtı.',
      },
      {
        year: '1526',
        title: 'Mohaç Savaşı',
        text: 'Kanuni Sultan Süleyman, Macar Kralı II. Layoş\'un ordusunu Mohaç ovasında kısa sürede bozguna uğrattı. Macar Krallığı\'nın çöküşüyle Osmanlı, Orta Avrupa\'da uzun soluklu bir nüfuz alanı kurdu.',
      },
      {
        year: '1529',
        title: 'I. Viyana Kuşatması',
        text: 'Osmanlı ordusu, Habsburg başkenti Viyana\'yı kuşattı. Kuşatma kışın yaklaşması ve lojistik güçlükler nedeniyle kaldırılsa da, Osmanlı gücünün Avrupa\'nın kalbine kadar ulaşabildiğini gösteren simgesel bir olay oldu.',
      },
      {
        year: '1538',
        title: 'Preveze Deniz Savaşı',
        text: 'Kaptan-ı Derya Barbaros Hayreddin Paşa komutasındaki Osmanlı donanması, Haçlı devletlerinin oluşturduğu birleşik filoyu Preveze açıklarında büyük bir yenilgiye uğrattı. Bu zaferle Osmanlı, Akdeniz\'de yaklaşık bir asır sürecek bir deniz üstünlüğü kurdu.',
      },
      {
        year: '1566',
        title: 'Kanuni\'nin Ölümü',
        text: 'Kırk altı yıllık saltanatı boyunca Osmanlı\'yı hukuki, askeri ve kültürel açıdan zirveye taşıyan Kanuni Sultan Süleyman, Zigetvar Kalesi kuşatması sırasında öldü. Kendisinden sonra tahta çıkan II. Selim ile birlikte devletin yükseliş ivmesi yavaşlamaya başladı.',
      },
    ],
  },
  {
    id: 'duraklama',
    title: 'Duraklama Dönemi',
    range: '1579 – 1699',
    summary: 'Genişlemenin sona erdiği, iç sorunların ve rakip güçlerin öne çıktığı yüzyıl.',
    intro:
      'XVI. yüzyılın sonlarından itibaren Osmanlı, hem içeride merkezi otoritenin sarsılması hem de Avrupa\'da güçlenen rakip devletlerin baskısıyla karşı karşıya kaldı. Fetihlerin yavaşladığı, yeniçeri isyanlarının sıklaştığı ve büyük güçlerle uzun savaşların yaşandığı bu dönem, 1699\'da imzalanan Karlofça Antlaşması ile Osmanlı\'nın ilk kez büyük çaplı toprak kaybına uğramasıyla kapandı.',
    events: [
      {
        year: '1596',
        title: 'Haçova Meydan Savaşı',
        text: 'III. Mehmed\'in bizzat katıldığı Haçova Savaşı, kritik bir anda kazanılan son büyük meydan muharebelerinden biri oldu. Zafere rağmen savaşın güçlükle kazanılması, ordunun eski gücünde olmadığına dair ilk işaretlerden sayıldı.',
      },
      {
        year: '1606',
        title: 'Zitvatorok Antlaşması',
        text: 'Avusturya ile on üç yıl süren savaşın ardından imzalanan bu antlaşma, Osmanlı Padişahı ile Habsburg İmparatoru\'nu ilk kez eşit statüde tanıdı. Bu, Osmanlı\'nın Avrupa üzerindeki mutlak üstünlük algısının sarsıldığı sembolik bir dönüm noktasıydı.',
      },
      {
        year: '1622',
        title: 'II. Osman\'ın Katli',
        text: 'Yeniçeri Ocağı\'nı ıslah etmeye çalışan genç padişah II. Osman (Genç Osman), bizzat yeniçeriler tarafından tahttan indirilip öldürüldü. Bir padişahın kendi askeri gücü tarafından katledilmesi, merkezi otoritenin ne denli zayıfladığının açık bir göstergesiydi.',
      },
      {
        year: '1638',
        title: 'Bağdat\'ın Fethi',
        text: 'IV. Murad, kişisel olarak yönettiği sefer sonucunda Safeviler\'den Bağdat\'ı geri aldı. Bu başarı, duraklama döneminin ortasında devletin hâlâ güçlü bir askeri kapasiteye sahip olduğunu gösteren istisnai bir parlama oldu.',
      },
      {
        year: '1683',
        title: 'II. Viyana Kuşatması',
        text: 'Sadrazam Merzifonlu Kara Mustafa Paşa komutasındaki Osmanlı ordusu, Viyana\'yı ikinci kez kuşattı ancak Polonya Kralı III. Jan Sobieski önderliğindeki yardım kuvvetleri karşısında ağır bir bozguna uğradı. Bu yenilgi, Osmanlı\'nın Avrupa\'daki ilerleyişinin kesin biçimde sona erdiği an olarak kabul edilir.',
      },
      {
        year: '1699',
        title: 'Karlofça Antlaşması',
        text: 'II. Viyana bozgunundan sonra kurulan Kutsal İttifak ile on altı yıl süren savaşların ardından imzalanan Karlofça Antlaşması ile Osmanlı, Macaristan\'ın büyük bölümünü ve diğer geniş toprakları kaybetti. Bu, Osmanlı tarihinde bir toprak kaybını resmen kabul eden ilk büyük antlaşma oldu ve Duraklama Dönemi\'nin sonu, Gerileme Dönemi\'nin başlangıcı sayılır.',
      },
    ],
  },
  {
    id: 'gerileme',
    title: 'Gerileme Dönemi',
    range: '1699 – 1792',
    summary: 'Toprak kayıplarının süreklileştiği, ıslahat arayışlarının başladığı yıllar.',
    intro:
      'Karlofça\'dan sonra Osmanlı, kaybettiği askeri ve teknolojik üstünlüğü yeniden kazanmanın yollarını aradı. Bir yandan Avrupa ile kısa süreli barış ve kültürel açılım dönemleri yaşandı, diğer yandan Rusya ile yapılan uzun savaşlar dizisi devleti giderek daha ağır toprak ve itibar kayıplarına sürükledi.',
    events: [
      {
        year: '1718',
        title: 'Pasarofça Antlaşması ve Lale Devri',
        text: 'Avusturya ile imzalanan Pasarofça Antlaşması sonrasında başlayan görece barış dönemi, Sadrazam Nevşehirli Damat İbrahim Paşa öncülüğünde "Lale Devri" olarak anılır. Bu dönemde İstanbul\'a ilk matbaa getirildi, Avrupa\'ya elçiler gönderildi ve saray çevresinde zarif bir kültürel hayat gelişti.',
      },
      {
        year: '1730',
        title: 'Patrona Halil İsyanı',
        text: 'Lale Devri\'nin getirdiği lüks harcamalara ve yeniliklere tepki duyan yeniçeriler, Patrona Halil önderliğinde ayaklandı. İsyan sonucunda III. Ahmed tahttan indirildi ve Lale Devri\'nin nispeten sakin atmosferi sona erdi.',
      },
      {
        year: '1768',
        title: 'Osmanlı-Rus Savaşı Başlıyor',
        text: 'Genişleyen Rus İmparatorluğu ile giderek sıklaşan sınır gerginlikleri, altı yıl sürecek büyük bir savaşa dönüştü. Bu savaş, Osmanlı\'nın kuzeydeki en büyük stratejik tehdidiyle, Rusya ile olan uzun rekabetinin en yıkıcı safhalarından birini başlattı.',
      },
      {
        year: '1774',
        title: 'Küçük Kaynarca Antlaşması',
        text: 'Savaşın Osmanlı aleyhine sonuçlanmasıyla imzalanan bu antlaşma, Kırım Hanlığı\'nın Osmanlı himayesinden çıkarak bağımsız (fiilen Rus etkisine açık) hale gelmesini sağladı; birkaç yıl sonra Kırım doğrudan Rusya\'ya katılacaktı. Antlaşma ayrıca Rusya\'ya Osmanlı topraklarındaki Ortodoks tebaayı koruma bahanesiyle içişlerine müdahale hakkı da tanıdı.',
      },
      {
        year: '1792',
        title: 'Yaş Antlaşması',
        text: 'Yeni bir Osmanlı-Rus savaşının ardından imzalanan Yaş Antlaşması ile Kırım\'ın kaybı kesinleşti ve Osmanlı\'nın kuzey sınırları Rusya lehine daha da geriledi. Bu antlaşma, gerileme sürecinin artık geri döndürülemez bir aşamaya girdiğinin habercisiydi.',
      },
    ],
  },
  {
    id: 'dagilma',
    title: 'Dağılma Dönemi',
    range: '1792 – 1922',
    summary: 'Reform çabaları, milliyetçi ayaklanmalar ve bir imparatorluğun sonu.',
    intro:
      'Son yüz otuz yıl, Osmanlı için hem en yoğun reform çabalarına hem de en ağır toprak kayıplarına sahne oldu. III. Selim\'in Nizam-ı Cedid hareketinden II. Abdülhamid\'in otoriter modernleşmesine, Balkan Savaşları\'nın yıkımından I. Dünya Savaşı\'nın çöküşüne uzanan bu süreç, altı asırlık imparatorluğun 1922\'de resmen sona ermesiyle noktalandı.',
    events: [
      {
        year: '1826',
        title: 'Vaka-i Hayriye: Yeniçeri Ocağı\'nın Kaldırılması',
        text: 'II. Mahmud, uzun süredir reformların önündeki en büyük engel haline gelen Yeniçeri Ocağı\'nı kanlı bir operasyonla lağvetti. "Hayırlı Olay" anlamına gelen bu adımla birlikte Avrupa tarzı yeni bir ordunun (Asakir-i Mansure-i Muhammediye) kuruluşunun önü açıldı.',
      },
      {
        year: '1839',
        title: 'Tanzimat Fermanı',
        text: 'Abdülmecid döneminde ilan edilen Tanzimat Fermanı, tüm tebaanın din ve mezhep farkı gözetmeksizin can, mal ve namus güvenliğini, vergi ve askerlik düzeninde adaleti hukuken güvence altına almayı vaat etti. Bu ferman, Osmanlı\'da modern anlamda hukuk devletine geçişin ve köklü idari reformların başlangıcı sayılır.',
      },
      {
        year: '1853',
        title: 'Kırım Savaşı',
        text: 'Osmanlı, Rusya\'nın güneye inme emeline karşı İngiltere ve Fransa ile ittifak kurarak Kırım Savaşı\'nı kazandı. Zafere rağmen savaşın maliyeti, Osmanlı\'nın ilk kez dış borçlanmaya başvurmasına yol açtı ve bu bağımlılık zamanla ağır bir mali krize dönüştü.',
      },
      {
        year: '1876',
        title: 'I. Meşrutiyet',
        text: 'II. Abdülhamid tahta çıkışının hemen ardından Kanun-i Esasi\'yi ilan ederek Osmanlı\'da anayasal monarşiye geçişi başlattı ve ilk Osmanlı Meclis-i Mebusanı toplandı. Ancak meclis, 1878\'de aynı padişah tarafından süresiz olarak kapatıldı.',
      },
      {
        year: '1908',
        title: 'II. Meşrutiyet',
        text: 'İttihat ve Terakki Cemiyeti\'nin öncülüğünde gelişen baskılar sonucunda II. Abdülhamid, 1876 Anayasası\'nı yeniden yürürlüğe koymak zorunda kaldı. Bu, Osmanlı siyasi hayatında çok partili meclis düzenine geçişin başlangıcı oldu.',
      },
      {
        year: '1912',
        title: 'Balkan Savaşları',
        text: 'Balkan devletlerinin ittifak kurarak Osmanlı\'ya karşı başlattığı savaşlar sonucunda imparatorluk, Rumeli\'deki topraklarının neredeyse tamamını kısa sürede kaybetti. Bu yıkım, Osmanlı kamuoyunda ve ordusunda derin bir travma yarattı.',
      },
      {
        year: '1914',
        title: 'I. Dünya Savaşı\'na Giriş',
        text: 'Osmanlı Devleti, Almanya\'nın yanında I. Dünya Savaşı\'na girdi. Çanakkale\'de büyük bir savunma zaferi kazanılsa da, savaşın genelinde Orta Doğu ve Kafkas cephelerinde ağır kayıplar yaşandı ve devlet dört yıl sonra yenilgiyle savaştan çıktı.',
      },
      {
        year: '1920',
        title: 'Sevr Antlaşması',
        text: 'İtilaf Devletleri\'nin İstanbul Hükümeti\'ne imzalattığı Sevr Antlaşması, Anadolu\'nun büyük bölümünü paylaştırarak Osmanlı\'yı fiilen ortadan kaldırıyordu. Ancak bu antlaşma hiçbir zaman uygulamaya konamadı; Anadolu\'da gelişen Millî Mücadele onu tarihe gömdü.',
      },
      {
        year: '1922',
        title: 'Saltanatın Kaldırılması',
        text: 'Türkiye Büyük Millet Meclisi, 1 Kasım 1922\'de saltanatı resmen kaldırdı. Son padişah VI. Mehmed Vahideddin\'in ülkeyi terk etmesiyle altı asırlık Osmanlı hanedan yönetimi sona erdi; yerini bir yıl sonra ilan edilecek olan Türkiye Cumhuriyeti\'ne bıraktı.',
      },
    ],
  },
];

export const allEventsFlat = periods.flatMap((p) =>
  p.events.map((e) => ({ ...e, periodId: p.id, periodTitle: p.title }))
);
