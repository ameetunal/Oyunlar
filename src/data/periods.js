// Osmanlı tarihi içeriği: dönemler ve dönüm noktası olaylar.
// Belgesel/kitap anlatımı için hazırlanmıştır — oyunlaştırma (puan, seviye, quiz) yoktur.
// Her olay metni, paragraflar arasında boş satırla ayrılmış birden fazla paragraf içerebilir.

export const periods = [
  {
    id: 'kurulus',
    title: 'Kuruluş Dönemi',
    range: '1299 – 1453',
    summary: 'Bir uç beyliğinden cihan devletine uzanan yolun ilk yüz elli yılı.',
    intro:
      'XIII. yüzyılın sonunda Anadolu, dağılan bir Selçuklu mirası ile Bizans\'ın çözülen sınır hattı arasında küçük Türkmen beyliklerine sahne oluyordu. Bu beyliklerden biri, Söğüt ve Domaniç yaylaları arasında sıkışmış, mütevazı bir uç beyliği olan Osmanlı, bir buçuk asır içinde önce Anadolu ve Rumeli\'de bir güç haline gelecek, sonra da Doğu Roma\'nın bin yıllık başkentini fethederek bir cihan devletine dönüşecekti.\n\nBu bölümde anlatılan yüz elli dört yıl, aynı zamanda devletin en kırılgan anını da içinde barındırır: Ankara Savaşı sonrası yaşanan Fetret Devri, kuruluşun tesadüfi bir başarı olmadığını, her nesilde yeniden inşa edilen bir iradenin ürünü olduğunu gösterir. Kuruluş Dönemi, bu yüzden yalnızca fetihlerin değil, aynı zamanda toparlanma ve devlet kurma kabiliyetinin de hikâyesidir.',
    events: [
      {
        year: '1299',
        title: 'Osmanlı Beyliği\'nin Kuruluşu',
        text:
          'Söğüt merkezli küçük bir Türkmen uç beyliğinin başındaki Osman Bey, Selçuklu Devleti\'nin fiilen ortadan kalkmasıyla bağımsız hareket etmeye başladı. Bizans\'ın Anadolu\'daki tekfurluklarıyla mücadele ederek beyliğinin sınırlarını genişletti; bu mücadele, aynı zamanda bir "gazi" kimliğinin ve etrafına asker toplayan bir önderin doğuşuydu.\n\nGeleneksel olarak devletin kuruluş tarihi bu yıl kabul edilir; adını da kurucusu Osman Bey\'den alır. O dönemde beyliğin toprakları bugünün ölçeğiyle küçücük bir bölgeden ibaretti, ancak Osman Bey\'in kurduğu askeri ve idari çekirdek, sonraki iki yüzyılda hızla büyüyecek bir devletin temelini oluşturdu.',
      },
      {
        year: '1302',
        title: 'Bafeus Savaşı',
        text:
          'Osman Bey\'in kuvvetleri, İznik yakınlarındaki Bafeus\'ta Bizans ordusunu yenilgiye uğrattı. Bu, Osmanlı\'nın Bizans\'a karşı kazandığı ilk büyük meydan savaşıydı ve bölgedeki Türkmen aşiretlerinin dikkatini Osman Bey\'in beyliğine çekti.\n\nZafer sonrasında çevredeki gaziler ve akıncılar giderek daha fazla Osman Bey\'in etrafında toplanmaya başladı; bu da beyliğin hem askeri gücünü hem de bölgedeki itibarını hızla artırdı.',
      },
      {
        year: '1326',
        title: 'Bursa\'nın Fethi',
        text:
          'Osman Bey\'in oğlu Orhan Bey, uzun süren bir kuşatmanın ardından Bursa\'yı ele geçirdi ve şehri beyliğin ilk başkenti yaptı. Kuşatma yıllarca sürmüş, şehir dışarıyla bağlantısı kesilerek adeta teslim olmaya zorlanmıştı.\n\nBursa\'nın alınması, Osmanlı\'nın artık geçici bir akıncı gücü değil, kalıcı bir devlet yapısına dönüştüğünün işaretiydi; şehirde darphane kurulması ve ilk Osmanlı parasının burada basılması da bu kurumsallaşmanın somut göstergeleri oldu.',
      },
      {
        year: '1329',
        title: 'Palekanon Savaşı',
        text:
          'Orhan Bey komutasındaki Osmanlı kuvvetleri, İznik\'i kurtarmaya gelen Bizans İmparatoru III. Andronikos\'un ordusunu Palekanon\'da bozguna uğrattı. İmparatorun bizzat yaralandığı bu savaş, Bizans\'ın Anadolu\'daki son büyük direniş girişimlerinden biriydi.\n\nZafer, İznik\'in kaderini büyük ölçüde belirledi; şehir artık dış yardım umudu kalmadan kendi başına Osmanlı kuşatmasıyla baş başa kaldı.',
      },
      {
        year: '1331',
        title: 'İznik\'in Fethi',
        text:
          'Palekanon\'daki yenilgiden sonra dış yardım alamayan İznik, uzun bir kuşatmanın ardından Orhan Bey\'e teslim oldu. Bin yıllık bir Bizans kültür ve din merkezi olan şehir, böylece Osmanlı topraklarına katıldı.\n\nİznik\'in fethi, beyliğin sınırlarını Marmara\'nın güneyinde iyice pekiştirdi ve kısa süre sonra bölgedeki diğer Bizans şehirlerinin de Osmanlı\'ya boyun eğmesinin önünü açtı.',
      },
      {
        year: '1354',
        title: 'Gelibolu ve Rumeli\'ye İlk Adım',
        text:
          'Bir deprem sonucu yıkılan Gelibolu ve çevresindeki kaleler, Orhan Bey\'in oğlu Süleyman Paşa komutasındaki Osmanlı kuvvetlerince ele geçirildi. Bu, Osmanlı\'nın Avrupa yakasında kazandığı ilk kalıcı toprak parçasıydı.\n\nGelibolu\'nun alınması sembolik bir eşik oldu: Osmanlı artık yalnızca Anadolu\'da değil, Rumeli\'de de kalıcı bir güç olma yoluna girmişti; sonraki fetihler için bir sıçrama tahtası haline geldi.',
      },
      {
        year: '1362',
        title: 'Edirne\'nin Fethi ve Rumeli\'ye Geçiş',
        text:
          'I. Murad döneminde Osmanlı kuvvetleri Rumeli\'deki ilerleyişini sürdürerek Edirne\'yi ele geçirdi. Şehir kısa süre içinde yeni başkent oldu; böylece Osmanlı hem Anadolu hem Avrupa yakasında topraklara sahip iki kıtalı bir devlete dönüştü.\n\nEdirne\'nin başkent olması, Balkanlar\'daki fetih hareketinin artık geçici akınlar değil, kalıcı bir yerleşim ve yönetim politikası olduğunu gösterdi; şehir bir asırdan uzun süre Osmanlı\'nın idari merkezi olarak kaldı.',
      },
      {
        year: '1389',
        title: 'I. Kosova Savaşı',
        text:
          'Sırp Prensi Lazar öncülüğündeki Balkan ittifakı ile Osmanlı kuvvetleri Kosova ovasında karşı karşıya geldi. Savaş Osmanlı zaferiyle sonuçlandı, ancak I. Murad savaş alanında suikaste kurban giderek şehit düştü.\n\nYerine oğlu I. Bayezid (Yıldırım) tahta çıktı ve savaş meydanında hızla kontrolü ele alarak hem zaferi taçlandırdı hem de babasının ölümünün yarattığı belirsizliği ortadan kaldırdı. Kosova, Balkan halklarının hafızasında uzun yıllar sürecek bir sembol haline geldi.',
      },
      {
        year: '1396',
        title: 'Niğbolu Savaşı',
        text:
          'Avrupa\'nın çeşitli krallıklarından oluşan büyük bir Haçlı ordusu, Osmanlı\'nın Balkanlar\'daki yükselişini durdurmak amacıyla Niğbolu\'da I. Bayezid\'in kuvvetleriyle karşılaştı. Osmanlı ordusu, sayıca üstün Haçlı birliklerini ağır bir yenilgiye uğrattı.\n\nBu zafer, Bayezid\'e "Yıldırım" lakabını pekiştirdi ve Osmanlı\'nın Balkanlar\'daki varlığının artık Avrupa\'nın ortak seferleriyle bile kolayca sarsılamayacağını gösterdi; ancak bu güç algısı, birkaç yıl sonra doğudan gelecek çok daha büyük bir tehditle sınanacaktı.',
      },
      {
        year: '1402',
        title: 'Ankara Savaşı ve Fetret Devri',
        text:
          'Doğudan gelen Timur\'un ordusuyla Yıldırım Bayezid\'in kuvvetleri Ankara yakınlarında çarpıştı. Osmanlı ordusu ağır bir yenilgi aldı, Bayezid esir düştü ve kısa süre sonra öldü.\n\nBayezid\'in oğulları arasındaki taht kavgalarıyla geçen bu on bir yıllık kargaşa dönemine tarihte "Fetret Devri" denir; devlet parçalanmanın eşiğinden döndü. Bu dönem, henüz bir asırlık olan Osmanlı\'nın kurumsal temellerinin ne kadar sağlam olduğunun da bir sınavıydı.',
      },
      {
        year: '1413',
        title: 'Çelebi Mehmed ile Birliğin Sağlanması',
        text:
          'Kardeşleri arasındaki mücadeleyi kazanan Çelebi Mehmed, Osmanlı topraklarını yeniden tek çatı altında topladı ve I. Mehmed unvanıyla tahta çıktı. Bu nedenle kendisine "İkinci Kurucu" da denir.\n\nSaltanatının geri kalanını büyük ölçüde iç barışı pekiştirmeye ve Fetret Devri\'nin açtığı yaraları sarmaya adayan Çelebi Mehmed, oğlu II. Murad\'a güçlü ve bütünleşmiş bir devlet miras bıraktı.',
      },
      {
        year: '1430',
        title: 'Selanik\'in Fethi',
        text:
          'II. Murad, stratejik açıdan önemli liman kenti Selanik\'i Venediklilerin elinden aldı. Şehrin fethi, Osmanlı\'nın Ege ve Balkanlar\'daki deniz ticareti üzerindeki denetimini pekiştirdi.\n\nSelanik, kısa sürede yeniden canlanarak Osmanlı\'nın Balkanlar\'daki en önemli liman ve ticaret merkezlerinden biri haline geldi.',
      },
      {
        year: '1444',
        title: 'Varna Savaşı',
        text:
          'II. Murad, Macar Kralı ve Polonya Kralı Vladislav önderliğindeki bir Haçlı ordusunu Varna\'da büyük bir yenilgiye uğrattı. Savaş sırasında Kral Vladislav hayatını kaybetti.\n\nBu zafer, Osmanlı\'nın Balkanlar\'daki varlığını Haçlı seferleriyle sarsılmaz kılan dönüm noktalarından biri oldu ve Avrupa\'nın Osmanlı\'yı Balkanlar\'dan çıkarma umutlarını uzun süreliğine ertelendi.',
      },
      {
        year: '1453',
        title: 'İstanbul\'un Fethi',
        text:
          'II. Mehmed, henüz yirmi bir yaşındayken elli üç gün süren bir kuşatmanın ardından Bizans\'ın bin yıllık başkenti Konstantinopolis\'i fethetti. Kuşatmada kullanılan dev toplar ve gemilerin karadan yürütülerek Haliç\'e indirilmesi, dönemin askeri tarihinde efsaneleşen anlardan biri oldu.\n\nBu zaferle "Fatih" unvanını alan II. Mehmed, şehri Osmanlı\'nın yeni başkenti yaptı. İstanbul\'un fethi, Orta Çağ\'ın sonu ve Osmanlı\'nın bölgesel güçten cihan devletine dönüşümünün simgesi sayılır; şehir kısa sürede yeniden imar edilerek çok dinli, çok kültürlü bir başkente dönüştü.',
      },
    ],
  },
  {
    id: 'yukselme',
    title: 'Yükselme Dönemi',
    range: '1453 – 1579',
    summary: 'Üç kıtaya yayılan sınırlar, güçlü bir merkezi devlet ve deniz üstünlüğü.',
    intro:
      'İstanbul\'un fethinden sonra Osmanlı, art arda gelen güçlü hükümdarlar eliyle Avrupa, Asya ve Afrika\'da sınırlarını genişletti. Fatih Sultan Mehmed\'in başlattığı merkezi devlet anlayışı, Yavuz Sultan Selim\'in doğu ve güney seferleriyle hem toprak hem de dini otorite bakımından büyüdü; oğlu Kanuni Sultan Süleyman döneminde ise Osmanlı hem karada hem denizde çağının en güçlü devleti haline geldi.\n\nBu bölümde anlatılan yüz yirmi altı yıl, yalnızca fetihlerin değil, aynı zamanda hukuk (Kanunname-i Osmani), mimari (Mimar Sinan\'ın eserleri) ve idari teşkilatlanmanın da altın çağıdır. Sınırlar Viyana kapılarından Basra Körfezi\'ne, Kırım\'dan Cezayir kıyılarına kadar uzanırken, Osmanlı aynı zamanda döneminin en gelişmiş bürokratik ve hukuki sistemlerinden birini inşa etti.',
    events: [
      {
        year: '1461',
        title: 'Trabzon Rum İmparatorluğu\'nun Sona Ermesi',
        text:
          'Fatih Sultan Mehmed, Bizans\'ın son artığı sayılan Trabzon Rum İmparatorluğu\'nu ortadan kaldırarak Karadeniz\'in güney kıyılarını tamamen Osmanlı hâkimiyetine kattı. Böylece Bizans\'ın çeşitli kollarından geriye hiçbir bağımsız devlet kalmadı.\n\nTrabzon\'un alınması, Fatih\'in "Roma\'nın son mirasçısı" iddiasını da güçlendirdi; Karadeniz ticaret yollarının denetimi artık büyük ölçüde Osmanlı\'nın elindeydi.',
      },
      {
        year: '1475',
        title: 'Kırım Hanlığı\'nın Osmanlı Himayesine Girmesi',
        text:
          'Osmanlı donanmasının Kefe ve çevresindeki Ceneviz kolonilerini ele geçirmesinin ardından Kırım Hanlığı, Osmanlı\'nın himayesini kabul etti. Bu ilişki, hanlığın iç işlerinde bir dereceye kadar bağımsız kalmasına izin verirken dış politikada Osmanlı\'ya bağlılığı gerektiriyordu.\n\nKırım Hanlığı, sonraki üç yüzyıl boyunca Osmanlı\'nın kuzey sınırında hem bir müttefik hem de Rusya\'ya karşı ileri bir karakol görevi gördü.',
      },
      {
        year: '1481',
        title: 'Fatih\'in Ölümü',
        text:
          'Yeni bir sefer hazırlığı sırasında Fatih Sultan Mehmed\'in ani ölümü, hem Osmanlı sarayında hem de Avrupa\'da büyük yankı uyandırdı. Otuz yıllık saltanatı boyunca imparatorluğun sınırlarını ve kurumlarını kökten dönüştürmüştü.\n\nYerine çıkan oğlu II. Bayezid, babasının fetih siyasetinden çok, iç istikrarı ve mevcut toprakları konsolide etmeyi önceleyen daha temkinli bir yönetim izledi.',
      },
      {
        year: '1514',
        title: 'Çaldıran Savaşı',
        text:
          'Yavuz Sultan Selim, Safevi hükümdarı Şah İsmail\'i Çaldıran\'da yenilgiye uğrattı. Osmanlı\'nın ateşli silahlardaki üstünlüğü, savaşın seyrinde belirleyici oldu.\n\nBu zafer, Osmanlı\'nın Doğu Anadolu ve sonrasında Orta Doğu\'ya açılan yolunu açtı ve İran\'la olan uzun rekabetin ilk büyük perdesini oluşturdu; Anadolu\'daki Safevi etkisi de bu savaşla büyük ölçüde geriletildi.',
      },
      {
        year: '1517',
        title: 'Mısır\'ın Fethi ve Halifelik',
        text:
          'Ridaniye Savaşı\'nda Memlük Devleti\'ni ortadan kaldıran Yavuz Sultan Selim, Mısır, Suriye, Hicaz ve kutsal şehirler Mekke ile Medine\'nin hâkimiyetini ele geçirdi. Sekiz yıl gibi kısa bir sürede devletin topraklarını neredeyse ikiye katladı.\n\nGeleneksel anlatıya göre halifelik unvanı da bu dönemde Osmanlı hanedanına geçti; devlet böylece İslam dünyasının siyasi ve manevi merkezlerinden biri haline geldi ve bu konum, sonraki dört asır boyunca Osmanlı\'nın uluslararası meşruiyetinin önemli bir dayanağı oldu.',
      },
      {
        year: '1521',
        title: 'Belgrad\'ın Fethi',
        text:
          'Kanuni Sultan Süleyman, tahta çıkışının hemen ardından, daha önce Fatih döneminde alınamamış olan stratejik öneme sahip Belgrad kalesini fethetti. Bu, genç padişahın gücünü hem içeride hem dışarıda kanıtladığı ilk büyük seferdi.\n\nBu zafer, Orta Avrupa\'ya açılan kapıyı Osmanlı\'ya açtı ve Macaristan üzerine yapılacak sonraki seferler için sağlam bir üs oluşturdu.',
      },
      {
        year: '1526',
        title: 'Mohaç Savaşı',
        text:
          'Kanuni Sultan Süleyman, Macar Kralı II. Layoş\'un ordusunu Mohaç ovasında kısa sürede bozguna uğrattı; çarpışma yaklaşık iki saat içinde sonuçlandı. Kral Layoş savaş alanından kaçarken bir bataklıkta boğularak öldü.\n\nMacar Krallığı\'nın çöküşüyle Osmanlı, Orta Avrupa\'da uzun soluklu bir nüfuz alanı kurdu; Macaristan toprakları sonraki yıllarda Osmanlı, Habsburg ve Erdel arasında paylaşılan bir mücadele sahasına dönüştü.',
      },
      {
        year: '1529',
        title: 'I. Viyana Kuşatması',
        text:
          'Osmanlı ordusu, Habsburg başkenti Viyana\'yı kuşattı. Kuşatma kışın yaklaşması, uzayan sefer mesafesi ve lojistik güçlükler nedeniyle kaldırılsa da, Osmanlı gücünün Avrupa\'nın kalbine kadar ulaşabildiğini gösteren simgesel bir olay oldu.\n\nViyana\'nın kuşatılması Avrupa\'da büyük bir korku dalgası yarattı ve Habsburg İmparatorluğu\'nu Osmanlı\'ya karşı daha kalıcı bir savunma hattı kurmaya yöneltti.',
      },
      {
        year: '1534',
        title: 'Bağdat\'ın Fethi (Irakeyn Seferi)',
        text:
          'Kanuni Sultan Süleyman, Safeviler\'e karşı düzenlediği Irakeyn (İki Irak) Seferi sırasında Bağdat\'ı ele geçirdi. Şehrin alınması, İslam dünyasının tarihi merkezlerinden birinin Osmanlı topraklarına katılması anlamına geliyordu.\n\nBu fetihle birlikte Osmanlı, Basra Körfezi\'ne kadar uzanan geniş bir Mezopotamya hattını denetimine aldı ve Safevilerle olan sınır mücadelesinde önemli bir üstünlük sağladı.',
      },
      {
        year: '1538',
        title: 'Preveze Deniz Savaşı',
        text:
          'Kaptan-ı Derya Barbaros Hayreddin Paşa komutasındaki Osmanlı donanması, Haçlı devletlerinin oluşturduğu birleşik filoyu Preveze açıklarında büyük bir yenilgiye uğrattı. Sayıca üstün düşman donanması, Barbaros\'un manevra kabiliyeti karşısında dağılmak zorunda kaldı.\n\nBu zaferle Osmanlı, Akdeniz\'de yaklaşık bir asır sürecek bir deniz üstünlüğü kurdu; Preveze, Osmanlı deniz tarihinin en parlak sayfalarından biri olarak anılır.',
      },
      {
        year: '1541',
        title: 'Budin\'in İlhakı',
        text:
          'Macaristan\'daki karışıklıkların ardından Kanuni Sultan Süleyman, Budin\'i doğrudan Osmanlı topraklarına kattı ve burada yeni bir eyalet kurdu. Böylece Macaristan\'ın orta kesimi doğrudan Osmanlı yönetimine geçti.\n\nBudin Eyaleti, sonraki yüz elli yıl boyunca Osmanlı\'nın Orta Avrupa\'daki en ileri karakolu ve Habsburglar\'a karşı ana savunma hattı olarak kaldı.',
      },
      {
        year: '1553',
        title: 'Amasya Antlaşması',
        text:
          'Safeviler ile uzun süredir devam eden savaşlar, Amasya\'da imzalanan antlaşmayla sona erdi. Bu antlaşma, iki devlet arasındaki ilk resmi sınır düzenlemesi niteliğindeydi ve Bağdat ile çevresinin Osmanlı\'da kalmasını güvence altına aldı.\n\nAmasya Antlaşması, yaklaşık yirmi yıl sürecek göreli bir doğu barışının kapısını araladı; bu süre Osmanlı\'nın enerjisini Avrupa ve Akdeniz cephelerine yoğunlaştırmasına imkân tanıdı.',
      },
      {
        year: '1566',
        title: 'Kanuni\'nin Ölümü',
        text:
          'Kırk altı yıllık saltanatı boyunca Osmanlı\'yı hukuki, askeri ve kültürel açıdan zirveye taşıyan Kanuni Sultan Süleyman, Zigetvar Kalesi kuşatması sırasında, kale düşmeden hemen önce öldü. Ölümü, kale alınana kadar sadrazam tarafından ordudan gizli tutuldu.\n\nKendisinden sonra tahta çıkan II. Selim ile birlikte devletin yükseliş ivmesi yavaşlamaya başladı; Kanuni döneminde oluşturulan hukuki ve idari çerçeve ise yüzyıllarca Osmanlı yönetiminin temel referansı olmaya devam etti.',
      },
      {
        year: '1571',
        title: 'Kıbrıs\'ın Fethi',
        text:
          'II. Selim döneminde Osmanlı kuvvetleri, Venedik\'in elindeki Kıbrıs adasını uzun bir kuşatma sonunda fethetti. Ada, Doğu Akdeniz\'deki Osmanlı deniz ticaret yollarının güvenliği açısından büyük önem taşıyordu.\n\nAncak fetih, aynı yıl içinde İnebahtı\'da alınacak ağır bir deniz yenilgisiyle gölgelenecek; Kıbrıs\'ın kazanılması ile İnebahtı\'nın kaybedilmesi, Osmanlı\'nın Akdeniz\'deki mutlak üstünlüğünün artık sorgulanabilir hale geldiğinin ilk işaretleri oldu.',
      },
    ],
  },
  {
    id: 'duraklama',
    title: 'Duraklama Dönemi',
    range: '1571 – 1699',
    summary: 'Genişlemenin sona erdiği, iç sorunların ve rakip güçlerin öne çıktığı yüzyıl.',
    intro:
      'XVI. yüzyılın son çeyreğinden itibaren Osmanlı, hem içeride merkezi otoritenin sarsılması hem de Avrupa\'da güçlenen rakip devletlerin baskısıyla karşı karşıya kaldı. İnebahtı\'da alınan ağır deniz yenilgisi, fetihlerin yavaşlaması, yeniçeri isyanlarının sıklaşması ve büyük güçlerle yapılan uzun savaşlar bu dönemin temel çizgilerini oluşturur.\n\nBuna karşın dönem, tamamen bir gerileme hikâyesi de değildir: Köprülüler gibi güçlü sadrazamların elinde devlet zaman zaman yeniden toparlanmış, hatta Girit\'in fethi gibi büyük başarılar da elde edilmiştir. Ancak 1699\'da imzalanan Karlofça Antlaşması ile Osmanlı\'nın ilk kez büyük çaplı ve kalıcı bir toprak kaybına uğraması, bu dönemin nihai kırılma noktası oldu.',
    events: [
      {
        year: '1571',
        title: 'İnebahtı Deniz Savaşı',
        text:
          'Kıbrıs\'ın fethine tepki olarak kurulan Haçlı donanması, Osmanlı filosunu İnebahtı Körfezi\'nde ağır bir yenilgiye uğrattı. Kaptan-ı Derya Müezzinzade Ali Paşa dahil çok sayıda deneyimli denizci bu savaşta hayatını kaybetti.\n\nYenilgi büyük bir şok yaratsa da Osmanlı, kış aylarında yeni bir donanma inşa ederek gücünü kısmen yeniden gösterdi. Yine de İnebahtı, Osmanlı\'nın Akdeniz\'deki dokunulmazlık algısının sona erdiği psikolojik bir eşik olarak tarihe geçti.',
      },
      {
        year: '1596',
        title: 'Haçova Meydan Savaşı',
        text:
          'III. Mehmed\'in bizzat katıldığı Haçova Savaşı, Avusturya ile süregelen "Uzun Savaş" sırasında kritik bir anda kazanılan son büyük meydan muharebelerinden biri oldu. Savaşın ilk saatlerinde Osmanlı ordusu bozguna uğramanın eşiğine gelmişti.\n\nZafere rağmen savaşın güçlükle ve son anda kazanılması, ordunun disiplin ve eski gücünde olmadığına dair ilk açık işaretlerden sayıldı; bu durum, sonraki yıllarda yürütülecek askeri ıslahat tartışmalarının da zeminini hazırladı.',
      },
      {
        year: '1606',
        title: 'Zitvatorok Antlaşması',
        text:
          'Avusturya ile on üç yıl süren "Uzun Savaş"ın ardından imzalanan bu antlaşma, Osmanlı Padişahı ile Habsburg İmparatoru\'nu ilk kez eşit statüde tanıdı; önceki antlaşmalarda Habsburg hükümdarı yalnızca bir "kral" olarak anılırken artık "imparator" unvanıyla muhatap alınıyordu.\n\nBu, Osmanlı\'nın Avrupa üzerindeki mutlak üstünlük algısının sarsıldığı sembolik bir dönüm noktasıydı ve diplomaside artık iki gücün daha dengeli bir zeminde karşı karşıya geldiğinin ilk resmi göstergesi oldu.',
      },
      {
        year: '1622',
        title: 'II. Osman\'ın Katli',
        text:
          'Yeniçeri Ocağı\'nı ıslah etmeye ve yeni bir ordu kurmaya çalışan genç padişah II. Osman (Genç Osman), bu girişimlerinden rahatsız olan yeniçeriler tarafından tahttan indirilip öldürüldü.\n\nBir padişahın kendi askeri gücü tarafından katledilmesi, Osmanlı tarihinde bir ilk olarak merkezi otoritenin ne denli zayıfladığının açık bir göstergesiydi ve sonraki dönemlerde saray ile ordu arasındaki gerilimli ilişkinin habercisi oldu.',
      },
      {
        year: '1638',
        title: 'Bağdat\'ın Fethi',
        text:
          'IV. Murad, kişisel olarak yönettiği sefer sonucunda Safeviler\'den Bağdat\'ı geri aldı. Sert ve disiplinli yönetim anlayışıyla tanınan padişah, seferi bizzat cephede yöneterek ordunun moralini yükseltti.\n\nBu başarı, duraklama döneminin ortasında devletin hâlâ güçlü bir askeri kapasiteye sahip olduğunu gösteren istisnai bir parlama oldu; Bağdat\'ın geri alınması, iki devlet arasındaki sınırı da büyük ölçüde kalıcı hale getirdi.',
      },
      {
        year: '1656',
        title: 'Köprülüler Devri\'nin Başlaması',
        text:
          'Mali ve askeri krizin derinleştiği bir dönemde tahta çıkan yaşlı devlet adamı Köprülü Mehmed Paşa, geniş yetkilerle sadrazamlığa getirildi ve sert bir disiplin anlayışıyla devlet düzenini yeniden tesis etti.\n\nOnun ardından oğlu Köprülü Fazıl Ahmed Paşa ile devam eden bu "Köprülüler Devri", Osmanlı\'ya birkaç on yıllık bir toparlanma ve yeniden askeri başarı dönemi kazandırdı.',
      },
      {
        year: '1664',
        title: 'Vasvar Antlaşması',
        text:
          'Köprülü Fazıl Ahmed Paşa\'nın Avusturya üzerine düzenlediği sefer, Saint Gotthard\'da alınan bir yenilgiye rağmen, Osmanlı\'nın diplomatik üstünlüğü sayesinde lehte bir antlaşmayla sonuçlandı.\n\nVasvar Antlaşması, meydanda kazanılamayan bir zaferin masada elde edilebileceğini gösteren, dönemin diplomasi kabiliyetine dair dikkat çekici bir örnektir.',
      },
      {
        year: '1669',
        title: 'Kandiye\'nin Fethi',
        text:
          'Venedik\'e karşı 1645\'te başlayan Girit Savaşı, adanın son büyük kalesi Kandiye\'nin (bugünkü Herakleion) yirmi dört yıl süren dünya tarihinin en uzun kuşatmalarından birinin ardından teslim alınmasıyla sona erdi.\n\nGirit\'in fethi, Köprülüler Devri\'nin en büyük askeri başarılarından biri olarak, Osmanlı\'nın hâlâ büyük çaplı ve uzun soluklu seferler yürütebildiğini kanıtladı.',
      },
      {
        year: '1683',
        title: 'II. Viyana Kuşatması',
        text:
          'Sadrazam Merzifonlu Kara Mustafa Paşa komutasındaki Osmanlı ordusu, Viyana\'yı ikinci kez kuşattı ancak Polonya Kralı III. Jan Sobieski önderliğindeki yardım kuvvetleri karşısında ağır bir bozguna uğradı.\n\nBu yenilgi, Osmanlı\'nın Avrupa\'daki ilerleyişinin kesin biçimde sona erdiği an olarak kabul edilir ve ardından kurulan Kutsal İttifak ile Osmanlı, on altı yıl sürecek çok cepheli bir savaşın içine sürüklendi.',
      },
      {
        year: '1691',
        title: 'Salankamen Savaşı',
        text:
          'Kutsal İttifak savaşları sürerken, dönemin yetenekli sadrazamı Köprülü Fazıl Mustafa Paşa, Salankamen\'de Habsburg kuvvetleriyle giriştiği savaşta hayatını kaybetti.\n\nOnun ölümü, Köprülüler Devri\'nin getirdiği toparlanma ivmesini büyük ölçüde kesintiye uğrattı ve Osmanlı\'yı savaşın geri kalanında daha savunmacı bir konuma itti.',
      },
      {
        year: '1699',
        title: 'Karlofça Antlaşması',
        text:
          'II. Viyana bozgunundan sonra kurulan Kutsal İttifak ile on altı yıl süren savaşların ardından imzalanan Karlofça Antlaşması ile Osmanlı, Macaristan\'ın büyük bölümünü, Erdel\'i ve diğer geniş toprakları kaybetti.\n\nBu, Osmanlı tarihinde bir toprak kaybını resmen ve topluca kabul eden ilk büyük antlaşma oldu; imparatorluk artık savunma pozisyonunda bir güç olarak görülmeye başlandı. Duraklama Dönemi\'nin sonu, Gerileme Dönemi\'nin başlangıcı sayılır.',
      },
    ],
  },
  {
    id: 'gerileme',
    title: 'Gerileme Dönemi',
    range: '1699 – 1792',
    summary: 'Toprak kayıplarının süreklileştiği, ıslahat arayışlarının başladığı yıllar.',
    intro:
      'Karlofça\'dan sonra Osmanlı, kaybettiği askeri ve teknolojik üstünlüğü yeniden kazanmanın yollarını aradı. Bir yandan Avrupa ile kısa süreli barış ve kültürel açılım dönemleri yaşandı, diğer yandan özellikle kuzeyde hızla güçlenen Rusya ile yapılan uzun savaşlar dizisi devleti giderek daha ağır toprak ve itibar kayıplarına sürükledi.\n\nBu dönem, Osmanlı\'nın Batı\'yı ilk kez sistemli biçimde gözlemlemeye ve öğrenmeye başladığı bir dönem olması bakımından da önemlidir. Elçilik raporları, matbaanın gelişi ve ilk askeri okul girişimleri, gerileme sürecinin aynı zamanda bir modernleşme arayışının da başlangıcı olduğunu gösterir.',
    events: [
      {
        year: '1711',
        title: 'Prut Seferi',
        text:
          'Baltık\'ta İsveç Kralı XII. Karl\'ı yenerek güçlenen Rus Çarı I. Petro, Osmanlı\'ya karşı sefere çıktı ancak Prut Nehri kıyısında Osmanlı ordusu tarafından kuşatılarak zor durumda bırakıldı.\n\nSadrazam Baltacı Mehmed Paşa, Çar\'ı imha etmek yerine görece hafif şartlarla bir antlaşma imzalamayı tercih etti; bu karar, sonraki yüzyıllarda "kaçırılmış bir fırsat" olarak sıkça tartışıldı, zira I. Petro birkaç yıl içinde çok daha büyük bir tehdit haline gelecekti.',
      },
      {
        year: '1718',
        title: 'Pasarofça Antlaşması ve Lale Devri',
        text:
          'Avusturya ile imzalanan Pasarofça Antlaşması sonrasında başlayan görece barış dönemi, Sadrazam Nevşehirli Damat İbrahim Paşa öncülüğünde "Lale Devri" olarak anılır. Bu dönemde İstanbul\'a ilk matbaa getirildi, Avrupa\'ya daimi elçiler gönderildi.\n\nSaray çevresinde zarif bir kültürel hayat gelişti; lale bahçeleri, kasırlar ve şenlikler bu dönemin simgesi haline geldi. Ancak bu gösterişli hayat tarzı, artan vergiler ve savaş yorgunluğu ile birleşince toplumsal hoşnutsuzluğu da büyütüyordu.',
      },
      {
        year: '1730',
        title: 'Patrona Halil İsyanı',
        text:
          'Lale Devri\'nin getirdiği lüks harcamalara, artan vergilere ve İran cephesindeki başarısızlıklara tepki duyan yeniçeriler, Patrona Halil önderliğinde İstanbul\'da ayaklandı.\n\nİsyan sonucunda III. Ahmed tahttan indirildi, Sadrazam Nevşehirli Damat İbrahim Paşa öldürüldü ve Lale Devri\'nin nispeten sakin atmosferi ani ve şiddetli bir biçimde sona erdi.',
      },
      {
        year: '1739',
        title: 'Belgrad Antlaşması',
        text:
          'Avusturya ve Rusya\'ya karşı yürütülen savaşların ardından imzalanan Belgrad Antlaşması, Osmanlı\'nın gerileme döneminde ender rastlanan olumlu bir diplomatik sonuç elde etmesini sağladı; Avusturya\'nın önceki savaşlarda kazandığı Belgrad ve çevresi geri alındı.\n\nBu antlaşma, Fransız diplomasisinin arabuluculuğuyla da desteklenmiş olması bakımından, Osmanlı\'nın Avrupa güç dengelerini kendi lehine kullanabildiği nadir örneklerden biri oldu.',
      },
      {
        year: '1740',
        title: 'Kapitülasyonların Kalıcılaşması',
        text:
          'Fransa\'ya önceden geçici olarak tanınan ticari ayrıcalıklar (kapitülasyonlar), 1740\'ta imzalanan bir antlaşmayla süresiz hale getirildi. Başlangıçta Osmanlı\'nın kendi iradesiyle bahşettiği bir lütuf olarak görülen bu ayrıcalıklar, artık geri alınamaz bir hukuki statüye kavuştu.\n\nZamanla diğer Avrupa devletlerine de benzer hakların tanınmasıyla kapitülasyonlar, Osmanlı ekonomisi üzerinde giderek ağırlaşan bir dış bağımlılık kaynağına dönüştü.',
      },
      {
        year: '1768',
        title: 'Osmanlı-Rus Savaşı Başlıyor',
        text:
          'Genişleyen Rus İmparatorluğu ile giderek sıklaşan sınır gerginlikleri, altı yıl sürecek büyük bir savaşa dönüştü. Rusya\'nın Karadeniz\'e açılma ve Osmanlı\'nın Ortodoks tebaası üzerinde etki kurma hedefleri, bu savaşın temel itici gücüydü.\n\nBu savaş, Osmanlı\'nın kuzeydeki en büyük stratejik tehdidiyle, Rusya ile olan uzun rekabetinin en yıkıcı safhalarından birini başlattı ve Osmanlı ordusunun Avrupa standartlarının artık ne kadar gerisinde kaldığını acı biçimde ortaya koydu.',
      },
      {
        year: '1774',
        title: 'Küçük Kaynarca Antlaşması',
        text:
          'Savaşın Osmanlı aleyhine sonuçlanmasıyla imzalanan bu antlaşma, Kırım Hanlığı\'nın Osmanlı himayesinden çıkarak bağımsız (fiilen Rus etkisine açık) hale gelmesini sağladı; birkaç yıl sonra Kırım doğrudan Rusya\'ya katılacaktı.\n\nAntlaşma ayrıca Rusya\'ya Osmanlı topraklarındaki Ortodoks tebaayı koruma bahanesiyle içişlerine müdahale hakkı da tanıdı; bu madde, sonraki bir buçuk asır boyunca Rusya\'nın Osmanlı iç işlerine müdahalesinin hukuki dayanağı olarak kullanıldı.',
      },
      {
        year: '1787',
        title: 'Yeni Bir Osmanlı-Rus Savaşı',
        text:
          'Kırım\'ın kaybının yarattığı öfke ve Rusya\'nın güneye doğru genişlemeye devam etmesi, Osmanlı\'yı yeni bir savaşa sürükledi. Bu kez Avusturya da Rusya\'nın yanında savaşa katıldı.\n\nSavaş, Osmanlı için bir kez daha ağır kayıplarla sonuçlandı ve devletin kuzey sınırlarındaki gerileme sürecinin durdurulamadığını bir kez daha gösterdi.',
      },
      {
        year: '1792',
        title: 'Yaş Antlaşması',
        text:
          'Yeni Osmanlı-Rus savaşının ardından imzalanan Yaş Antlaşması ile Kırım\'ın kaybı kesinleşti ve Osmanlı\'nın kuzey sınırları Rusya lehine daha da geriledi; Rusya\'nın Karadeniz kıyılarındaki hâkimiyeti pekişti.\n\nBu antlaşma, gerileme sürecinin artık geri döndürülemez bir aşamaya girdiğinin habercisiydi ve az sonra tahta çıkacak III. Selim\'i kapsamlı bir askeri ve idari reform arayışına yöneltecek zemini hazırladı.',
      },
    ],
  },
  {
    id: 'dagilma',
    title: 'Dağılma Dönemi',
    range: '1789 – 1922',
    summary: 'Reform çabaları, milliyetçi ayaklanmalar ve bir imparatorluğun sonu.',
    intro:
      'Son yüz otuz üç yıl, Osmanlı için hem en yoğun reform çabalarına hem de en ağır toprak kayıplarına sahne oldu. III. Selim\'in Nizam-ı Cedid hareketinden II. Abdülhamid\'in otoriter modernleşmesine, Balkan Savaşları\'nın yıkımından I. Dünya Savaşı\'nın çöküşüne uzanan bu süreç, altı asırlık imparatorluğun 1922\'de resmen sona ermesiyle noktalandı.\n\nBu dönemin trajik özelliği, reform çabalarının çoğu zaman doğru teşhislere dayanmasına rağmen, hem içeride güçlü direnişlerle hem de dışarıda büyük devletlerin müdahaleleriyle sık sık akamete uğramasıdır. Milliyetçilik akımlarının Balkanlar\'dan başlayıp imparatorluğun dört bir yanına yayılması, çok uluslu bir imparatorluğun yönetilebilirliğini giderek daha zor bir hale getirdi.',
    events: [
      {
        year: '1789',
        title: 'III. Selim ve Nizam-ı Cedid',
        text:
          'Tahta çıkan III. Selim, Avrupa tarzı eğitilmiş yeni bir ordu (Nizam-ı Cedid) kurmak ve mali, idari alanlarda kapsamlı reformlar yapmak amacıyla geniş bir ıslahat programı başlattı.\n\nReformlar, yeniçeriler ve onlarla çıkar birliği içindeki çevrelerin sert direnişiyle karşılaştı; bu direniş, III. Selim\'in saltanatının sonraki yıllarında giderek büyüyen bir tehdide dönüşecekti.',
      },
      {
        year: '1808',
        title: 'Sened-i İttifak',
        text:
          'III. Selim\'in tahttan indirilip öldürülmesinin ardından tahta çıkan II. Mahmud, kısa süreliğine iktidarı ele geçiren Alemdar Mustafa Paşa\'nın desteğiyle taşra ayanlarıyla Sened-i İttifak\'ı imzaladı.\n\nBu belge, merkezi otorite ile yerel güç sahipleri arasındaki ilişkiyi yazılı bir çerçeveye oturtma girişimi olarak, Osmanlı anayasal tarihinin ilk adımlarından biri sayılır; ancak Alemdar\'ın kısa süre sonra öldürülmesiyle uygulaması sınırlı kaldı.',
      },
      {
        year: '1821',
        title: 'Yunan İsyanı',
        text:
          'Fransız Devrimi\'nin yaydığı milliyetçilik fikirlerinden etkilenen Rum tebaa, Mora yarımadasında geniş çaplı bir isyan başlattı. İsyan kısa sürede Avrupa kamuoyunda büyük bir sempati dalgası yarattı.\n\nBüyük güçlerin -özellikle İngiltere, Fransa ve Rusya\'nın- doğrudan askeri ve diplomatik desteğiyle güçlenen isyan, Osmanlı\'nın çok uluslu yapısındaki ilk büyük milliyetçi kopuşu temsil etti ve sonraki bağımsızlık hareketlerine örnek oldu.',
      },
      {
        year: '1826',
        title: 'Vaka-i Hayriye: Yeniçeri Ocağı\'nın Kaldırılması',
        text:
          'II. Mahmud, uzun süredir reformların önündeki en büyük engel haline gelen Yeniçeri Ocağı\'nı kanlı bir operasyonla lağvetti. Yeniçerilerin yeni orduya karşı çıkarak ayaklanması, topçu birlikleriyle sert biçimde bastırıldı.\n\n"Hayırlı Olay" anlamına gelen bu adımla birlikte Avrupa tarzı yeni bir ordunun (Asakir-i Mansure-i Muhammediye) kuruluşunun önü açıldı; bu, II. Mahmud dönemi boyunca sürecek geniş kapsamlı modernleşme hamlelerinin de kilit taşı oldu.',
      },
      {
        year: '1830',
        title: 'Yunanistan\'ın Bağımsızlığı',
        text:
          'Dokuz yıl süren isyan ve büyük güçlerin doğrudan müdahalesi (özellikle Navarin\'de Osmanlı-Mısır donanmasının imhası) sonucunda Yunanistan, bağımsız bir devlet olarak tanındı.\n\nBu, Osmanlı\'nın Balkanlar\'daki topraklarından milliyetçi bir hareket sonucunda kaybettiği ilk bölge oldu ve sonraki Balkan milliyetçiliklerine hem ilham hem de model teşkil etti.',
      },
      {
        year: '1839',
        title: 'Tanzimat Fermanı',
        text:
          'Abdülmecid döneminde ilan edilen Tanzimat Fermanı, tüm tebaanın din ve mezhep farkı gözetmeksizin can, mal ve namus güvenliğini, vergi ve askerlik düzeninde adaleti hukuken güvence altına almayı vaat etti.\n\nBu ferman, Osmanlı\'da modern anlamda hukuk devletine geçişin ve köklü idari reformların başlangıcı sayılır; izleyen otuz yedi yıl boyunca eğitimden vergi sistemine, yerel yönetimlerden ceza hukukuna kadar geniş bir alanda düzenlemeler bu çerçevede hayata geçirildi.',
      },
      {
        year: '1853',
        title: 'Kırım Savaşı',
        text:
          'Osmanlı, Rusya\'nın güneye inme ve Osmanlı topraklarındaki Ortodoks nüfus üzerinde etki kurma emeline karşı İngiltere ve Fransa ile ittifak kurarak Kırım Savaşı\'nı kazandı.\n\nZafere rağmen savaşın maliyeti, Osmanlı\'nın ilk kez dış borçlanmaya başvurmasına yol açtı ve bu bağımlılık zamanla ağır bir mali krize dönüşerek devletin ekonomik bağımsızlığını giderek zayıflattı.',
      },
      {
        year: '1856',
        title: 'Islahat Fermanı',
        text:
          'Kırım Savaşı\'nı sona erdiren Paris Antlaşması\'nın hemen öncesinde ilan edilen Islahat Fermanı, gayrimüslim tebaaya Tanzimat Fermanı\'nın öngördüğünden daha geniş haklar ve Avrupa devletlerinin güvencesi altında bir statü tanıdı.\n\nFerman, büyük güçlerin Osmanlı iç işlerine müdahalesini bir ölçüde meşrulaştırırken, imparatorluk içindeki dini ve etnik toplulukların konumunu da yeniden şekillendirdi.',
      },
      {
        year: '1876',
        title: 'I. Meşrutiyet',
        text:
          'II. Abdülhamid tahta çıkışının hemen ardından Kanun-i Esasi\'yi ilan ederek Osmanlı\'da anayasal monarşiye geçişi başlattı ve ilk Osmanlı Meclis-i Mebusanı toplandı.\n\nAncak meclis, Osmanlı-Rus Savaşı\'nın patlak vermesinin ardından 1878\'de aynı padişah tarafından süresiz olarak kapatıldı; bu, Osmanlı\'nın anayasal deneyiminin otuz yıl boyunca askıya alınması anlamına geliyordu.',
      },
      {
        year: '1878',
        title: 'Berlin Antlaşması (93 Harbi\'nin Sonucu)',
        text:
          '1877-1878 Osmanlı-Rus Savaşı ("93 Harbi"), Osmanlı için ağır bir yenilgiyle sonuçlandı; Rus orduları İstanbul\'un kapılarına kadar dayandı. Büyük güçlerin Rusya\'nın aşırı kazanımlarını dengelemek için topladığı Berlin Kongresi sonucunda imzalanan antlaşma ile Sırbistan, Karadağ ve Romanya bağımsızlığını kazandı, Bulgaristan geniş bir özerklik elde etti.\n\nBu antlaşma, Osmanlı\'nın Balkanlar\'daki topraklarının büyük bölümünü kaybetmesi anlamına geliyordu ve imparatorluğun Avrupa\'daki varlığını kalıcı biçimde daralttı.',
      },
      {
        year: '1908',
        title: 'II. Meşrutiyet',
        text:
          'İttihat ve Terakki Cemiyeti\'nin öncülüğünde gelişen baskılar ve Rumeli\'deki ordu birliklerinin ayaklanma tehdidi sonucunda II. Abdülhamid, 1876 Anayasası\'nı yeniden yürürlüğe koymak zorunda kaldı.\n\nBu, Osmanlı siyasi hayatında çok partili meclis düzenine geçişin başlangıcı oldu; ancak yeni dönem, kısa süre içinde 31 Mart Vakası gibi ciddi bir karşı darbe girişimiyle de sınandı.',
      },
      {
        year: '1912',
        title: 'Balkan Savaşları',
        text:
          'Balkan devletlerinin (Bulgaristan, Sırbistan, Yunanistan ve Karadağ) ittifak kurarak Osmanlı\'ya karşı başlattığı savaşlar sonucunda imparatorluk, Rumeli\'deki topraklarının neredeyse tamamını birkaç ay gibi kısa bir sürede kaybetti.\n\nBu yıkım, Osmanlı kamuoyunda ve ordusunda derin bir travma yarattı; kaybedilen topraklardan gelen büyük mülteci dalgaları ve ordunun içindeki yenilgi psikolojisi, sonraki yıllardaki siyasi ve askeri kararları da doğrudan etkiledi.',
      },
      {
        year: '1914',
        title: 'I. Dünya Savaşı\'na Giriş',
        text:
          'Osmanlı Devleti, İttihat ve Terakki hükümetinin kararıyla Almanya\'nın yanında I. Dünya Savaşı\'na girdi. Savaş, imparatorluğun aynı anda Kafkasya, Kanal, Mezopotamya, Çanakkale ve Filistin gibi çok sayıda cephede birden mücadele etmesine yol açtı.\n\nBu çok cepheli savaş, zaten mali ve askeri açıdan yıpranmış olan devlet için ağır bir yük oluşturdu ve dört yıl sonra imparatorluğun tarihe karışmasıyla sonuçlanacak sürecin doğrudan başlangıcı oldu.',
      },
      {
        year: '1915',
        title: 'Çanakkale Savaşı',
        text:
          'İtilaf Devletleri\'nin İstanbul\'u ele geçirip Rusya\'ya doğrudan yardım hattı açmak amacıyla giriştiği Çanakkale çıkarması, Osmanlı ordusunun sert direnişiyle büyük bir yenilgiye uğratıldı.\n\nBu savunma zaferi, savaşın genel gidişatını değiştirmese de Osmanlı kamuoyunda büyük bir moral kaynağı oldu ve komutanlarından Mustafa Kemal\'in daha sonra Millî Mücadele\'de oynayacağı role giden yolda önemli bir aşama teşkil etti.',
      },
      {
        year: '1919',
        title: 'Mustafa Kemal\'in Samsun\'a Çıkışı',
        text:
          'I. Dünya Savaşı\'nın yenilgiyle sonuçlanmasının ve İstanbul Hükümeti\'nin İtilaf Devletleri karşısındaki çaresizliğinin ardından, Mustafa Kemal Paşa 19 Mayıs 1919\'da Samsun\'a çıkarak Anadolu\'daki direniş örgütlenmesine öncülük etmeye başladı.\n\nBu tarih, Türkiye\'de geleneksel olarak Millî Mücadele\'nin başlangıcı kabul edilir ve Osmanlı\'nın son yıllarını, kurulmakta olan yeni bir devletin ilk adımlarına bağlayan köprü niteliği taşır.',
      },
      {
        year: '1920',
        title: 'Sevr Antlaşması',
        text:
          'İtilaf Devletleri\'nin İstanbul Hükümeti\'ne imzalattığı Sevr Antlaşması, Anadolu\'nun büyük bölümünü çeşitli devletler ve manda yönetimleri arasında paylaştırarak Osmanlı\'yı fiilen ortadan kaldırıyordu.\n\nAncak bu antlaşma hiçbir zaman uygulamaya konamadı; Anadolu\'da gelişen ve giderek güçlenen Millî Mücadele, antlaşmanın öngördüğü paylaşım planını fiilen geçersiz kılarak onu tarihe gömdü.',
      },
      {
        year: '1922',
        title: 'Saltanatın Kaldırılması',
        text:
          'Millî Mücadele\'nin askeri ve siyasi zaferle sonuçlanmasının ardından, Türkiye Büyük Millet Meclisi 1 Kasım 1922\'de saltanatı resmen kaldırdı.\n\nSon padişah VI. Mehmed Vahideddin\'in bir İngiliz savaş gemisiyle ülkeyi terk etmesiyle altı asırlık Osmanlı hanedan yönetimi fiilen ve hukuken sona erdi; yerini bir yıl sonra, 29 Ekim 1923\'te ilan edilecek olan Türkiye Cumhuriyeti\'ne bıraktı.',
      },
    ],
  },
];

export const allEventsFlat = periods.flatMap((p) =>
  p.events.map((e) => ({ ...e, periodId: p.id, periodTitle: p.title }))
);
