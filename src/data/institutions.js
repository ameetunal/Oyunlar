// Osmanlı devlet yapısını ayakta tutan temel kurumlar — askeri, idari,
// hukuki ve toplumsal. Günlük Yaşam (dailyLife.js) gündelik hayatı ele
// alırken, bu dosya devletin kendisini nasıl örgütlediğini konu alır.
// Her giriş kendi sayfasında bir başlık ve 2 paragraflık bir anlatım
// içerir; index sayfasında kısa bir özetle listelenir.
export const institutions = [
  {
    order: 1,
    topic: 'Divan-ı Hümayun',
    title: 'İmparatorluğun Kalbi: Divan-ı Hümayun',
    summary: 'Devletin en üst karar organı — sadrazamın başkanlığında toplanan devlet meclisi.',
    text: `Divan-ı Hümayun, Osmanlı Devleti'nin en üst düzey yönetim ve danışma kuruluydu; başlangıçta bizzat padişahın başkanlık ettiği bu meclis, II. Mehmed (Fatih) döneminden itibaren sadrazamın başkanlığına devredildi — padişah ise kafes benzeri bir pencereden (Kasr-ı Adil) toplantıları gizlice izleyebiliyordu. Divan'da sadrazam, vezirler, kazasker, defterdar ve nişancı gibi devletin en üst bürokratları bir araya gelir; savaş kararından vergi düzenlemelerine, dış elçi kabullerinden halkın şikâyet dilekçelerine kadar devletin hemen her meselesi burada görüşülürdü.

Divan toplantıları haftanın belirli günlerinde Topkapı Sarayı'nın ikinci avlusundaki Kubbealtı'nda yapılır, kararlar deftere kaydedilirdi; bu kayıtlar (mühimme defterleri) bugün tarihçiler için devasa bir arşiv kaynağı oluşturur. 17. yüzyıldan itibaren devletin günlük işleyişi giderek sadrazamın kendi konağındaki "ikindi divanı"na kaymaya başladı, bu da Divan-ı Hümayun'un eski merkezi önemini yavaş yavaş yitirmesine yol açtı; kurum resmen 19. yüzyıl ortasındaki Tanzimat reformlarıyla yerini modern bakanlıklar sistemine bıraktı.`,
  },
  {
    order: 2,
    topic: 'Tımar Sistemi',
    title: 'Toprağın ve Askerin Dengesi: Tımar Sistemi',
    summary: 'Hazineye nakit yük getirmeden süvari ordusu besleyen, toprağa dayalı özgün bir düzen.',
    text: `Tımar sistemi, Osmanlı'nın kırsal ekonomiyi ve ordusunu bir arada yönetebilmesini sağlayan, devletin mülkiyetinde kalan tarım topraklarının vergi gelirinin asker beslemek amacıyla sipahilere (tımarlı süvarilere) tahsis edilmesine dayanan bir sistemdi. Tımar sahibi toprağın kendisine değil, yalnızca belirli bir bölgenin vergi gelirine (hisseye) sahip olur; karşılığında savaş zamanında kendi atını, silahını ve -gelirinin büyüklüğüne göre- belirli sayıda cebelü (zırhlı asker) getirmekle yükümlüydü.

Bu sistem, merkezi hazineden nakit maaş ödemeden büyük bir süvari ordusu beslemeyi mümkün kılarken, aynı zamanda tımar sahibinin bulunduğu bölgede asayişi sağlaması ve üretimi denetlemesi gibi idari görevler de üstlenmesini sağlıyordu — yani hem askeri hem mali hem idari bir işlev görüyordu. 16. yüzyıl sonlarından itibaren ateşli silahların önem kazanmasıyla sipahi süvarisinin askeri değeri azaldı, enflasyon ve toprak gelirlerinin iltizam (vergi toplama ihalesi) sistemine kaymasıyla da tımar düzeni giderek çözüldü; 19. yüzyılda Tanzimat reformlarıyla sistem resmen tasfiye edildi.`,
  },
  {
    order: 3,
    topic: 'Yeniçeri Ocağı',
    title: 'Devşirmeden Kapıkuluna: Yeniçeri Ocağı',
    summary: 'Padişahın maaşlı daimi piyade ordusu — hem imparatorluğun gücü hem de en büyük baş belası.',
    text: `Yeniçeri Ocağı, I. Murad döneminde kurulduğu kabul edilen, Avrupa'nın ilk daimi, maaşlı piyade ordularından biriydi. Özellikle Balkanlar'daki Hristiyan tebaadan "devşirme" usulüyle toplanan çocuklar, sıkı bir eğitimden geçirilerek hem asker hem de sadık bir bürokrat sınıfı yetiştirmek üzere yetiştirilirdi; bu sayede padişaha, yerel beylik ve ailelerle bağı olmayan, doğrudan kendisine bağlı bir güç kazandırılmış oluyordu. Yeniçeriler kazan ve kaşık gibi sembollerle güçlü bir birlik kültürü geliştirmiş, Acemi Ocağı'ndan yetişen tecrübeli neferleriyle 15-16. yüzyıl Osmanlı fetihlerinin bel kemiğini oluşturmuştu.

Zamanla ocağın disiplini bozuldu: devşirme usulü fiilen terk edilip üyelik babadan oğula geçen bir imtiyaza dönüştü, yeniçeriler esnaflık ve ticaretle uğraşmaya başladı, savaş meydanındaki değerleri düştü. Buna karşın ocak, İstanbul'da padişah tahttan indirme ve devirme hareketlerine (isyanlara) karışacak kadar güçlü bir siyasi baskı grubu haline geldi. II. Mahmud, 1826'da "Vaka-i Hayriye" olarak anılan sert bir harekatla ocağı topa tutarak kapattı; bu, imparatorluğun askeri modernleşme sürecinde dönüm noktası sayılan köklü bir reform adımıydı.`,
  },
  {
    order: 4,
    topic: 'Millet Sistemi',
    title: 'Farklı İnançların Bir Arada Yönetimi: Millet Sistemi',
    summary: 'Gayrimüslim cemaatlerin kendi dini liderleri aracılığıyla özerk biçimde yönetilmesi.',
    text: `Millet sistemi, Osmanlı Devleti'nin çok dinli ve çok etnikli tebaasını yönetme biçimiydi: Müslüman olmayan topluluklar, dinî aidiyetlerine göre (Rum Ortodoks, Ermeni, Yahudi gibi) ayrı "millet"ler olarak tanınır, her milletin kendi dinî lideri (örneğin Rum Ortodoks Patriği ya da Hahambaşı) hem cemaatinin ruhani önderi hem de devlet nezdindeki resmi muhatabı olarak görev yapardı. Bu liderler kendi cemaatleri içinde evlilik, miras, eğitim gibi konularda geniş bir özerklikle kendi hukuk ve okul sistemlerini yürütebiliyordu.

Karşılığında gayrimüslim tebaa, Müslümanlardan farklı olarak cizye (baş vergisi) öder, bazı kıyafet ve statü kısıtlamalarına tabi olurdu; ancak genel olarak dönemin Avrupa standartlarına kıyasla önemli bir dinî hoşgörü ve iç özerklik sunan bu sistem, imparatorluğun yüzyıllarca farklı dinlerden toplulukları bir arada tutabilmesinin temel mekanizmalarından biriydi. 19. yüzyılda Tanzimat ve Islahat fermanlarıyla eşit vatandaşlık ilkesi benimsenmeye çalışılsa da, millet sisteminin cemaatler arası ayrışmayı pekiştiren mirası, imparatorluğun son döneminde milliyetçi hareketlerin yükselişinde de rol oynadı.`,
  },
  {
    order: 5,
    topic: 'Kapıkulu Ocakları',
    title: 'Padişahın Doğrudan Askerleri: Kapıkulu Ocakları',
    summary: 'Yeniçerilerin yanı sıra sarayın atlı ve teknik birliklerini oluşturan kapıkulu sınıfı.',
    text: `Kapıkulu askerleri, tımarlı sipahilerin aksine doğrudan merkezi hazineden düzenli nakit maaş (ulufe) alan, padişaha şahsen bağlı asker sınıfını oluşturuyordu. Bu sınıf yalnızca piyade yeniçerilerden değil, "Altı Bölük Halkı" adı verilen seçkin süvari birliklerinden (sipahi, silahtar gibi) ve topçu, cebeci, top arabacısı gibi teknik/lojistik ocaklardan da oluşuyordu; bu teknik birimler, Osmanlı'nın 15-16. yüzyılda top dökümü ve kuşatma teknolojisinde Avrupa'yla rekabet edebilmesini sağlayan uzmanlaşmış kadrolardı.

Kapıkulu askerlerine üç ayda bir düzenlenen "ulufe dağıtımı" törenle yapılır, bu törenler aynı zamanda askerin padişaha bağlılığının sembolik bir teyidiydi; ulufenin geç ya da düşük ayarlı akçeyle ödenmesi tarih boyunca pek çok asker isyanının doğrudan tetikleyicisi oldu (örneğin 1589 Beylerbeyi Vakası). 17. yüzyıldan itibaren kapıkulu ocaklarının sayısı kontrolsüzce şişti, bu da hem hazineye ağır bir mali yük bindirdi hem de ocakların disiplinini zayıflattı; nihayetinde bu yapı, 19. yüzyıl başındaki radikal askeri reformlarla tamamen yeniden kurulacaktı.`,
  },
  {
    order: 6,
    topic: 'Şeyhülislamlık ve İlmiye',
    title: 'Fetva Makamı: Şeyhülislamlık ve İlmiye Teşkilatı',
    summary: 'Dini ve hukuki otoritenin zirvesi — kadılardan müftülere uzanan ilmiye hiyerarşisi.',
    text: `İlmiye teşkilatı, Osmanlı'da din, hukuk ve eğitimi tek bir hiyerarşik yapı altında birleştiren kurumdu; medreselerde yetişen ulema, kademe kademe müderrislik (öğretim üyeliği) ve kadılık (hâkimlik) görevlerine atanırdı. Bu hiyerarşinin zirvesinde, önce kazaskerler (ordu ve ülke çapında baş kadılar), onların da üzerinde ise zamanla gücü giderek artan şeyhülislam yer alıyordu; şeyhülislam, devletin en üst dinî-hukuki otoritesi olarak padişahın icraatlarının İslam hukukuna (şeriat) uygunluğunu "fetva" yoluyla onaylardı.

Bir savaş ilanından yeni bir vergi uygulamasına, hatta bir padişahın tahttan indirilmesine kadar pek çok kritik devlet kararı, meşruiyetini şeyhülislamın fetvasından alırdı — bu da makamı yalnızca dinî değil, aynı zamanda güçlü bir siyasi aktör haline getiriyordu. Kadılar ise taşrada hem yargı hem belediye hem noterlik benzeri işlevleri tek başlarına yürütür, kadı sicilleri (mahkeme kayıtları) bugün Osmanlı toplumsal tarihinin en zengin kaynaklarından birini oluşturur. Tanzimat sonrası modern mahkemelerin kurulmasıyla ilmiye teşkilatının yargı alanındaki tekeli giderek daralsa da, kurum Cumhuriyet'e kadar varlığını sürdürdü.`,
  },
  {
    order: 7,
    topic: 'Enderun Mektebi',
    title: 'Sarayın İçinde Bir Okul: Enderun Mektebi',
    summary: 'Devşirme gençlerin devletin en üst kademelerine hazırlandığı seçkin saray okulu.',
    text: `Enderun, Topkapı Sarayı'nın iç avlularında yer alan, devşirme yoluyla toplanan en yetenekli gençlerin devletin üst kademelerine hazırlandığı özel bir eğitim kurumuydu. Buraya seçilen gençler, sıkı bir disiplin içinde dil (Arapça, Farsça), tarih, hat sanatı, müzik, güreş ve silah kullanımı gibi çok yönlü bir müfredatla yetiştirilir; kademe kademe ilerleyerek (Büyük ve Küçük Odalar, Seferli Koğuşu, Has Oda gibi) sarayın en güvenilir ve yakın hizmetlerine terfi ederlerdi.

Enderun'dan yetişen pek çok isim, sadrazamlık dahil devletin en üst makamlarına kadar yükseldi; bu sistem, yerel aristokrasiye bağlı olmayan, tamamen padişaha sadık, liyakate dayalı bir yönetici sınıfı üretme amacı taşıyordu ve döneminin pek çok Avrupa sarayına kıyasla dikkat çekici derecede meritokratik bir mekanizmaydı. Enderun ayrıca dönemin önemli bir sanat ve kültür merkeziydi; pek çok hattat, musikişinas ve şair burada yetişti. 17. yüzyıldan itibaren devşirme uygulamasının zayıflamasıyla Enderun'un bu özgün işlevi de giderek aşındı, kurum 19. yüzyılda modern okulların açılmasıyla önemini yitirdi.`,
  },
  {
    order: 8,
    topic: 'Has Oda ve Harem Teşkilatı',
    title: 'Sarayın İç Düzeni: Has Oda ve Harem Teşkilatı',
    summary: 'Padişahın en yakın hizmetini gören Has Oda ile hanedanın yaşam alanı Harem\'in işleyişi.',
    text: `Has Oda, Enderun hiyerarşisinin en üst basamağıydı; burada görev yapan "has odalılar", padişahın bizzat şahsi hizmetini gören, onun silahlarını, kıyafetlerini ve günlük ihtiyaçlarını karşılayan en güvenilir kişilerdi. Bu yakınlık, has odalılara sıradan bir hizmetkârdan çok daha fazla siyasi etki kazandırır, bazı padişahların en güvendiği danışmanları bu daireden çıkardı. Harem ise sıkça sanıldığının aksine yalnızca bir "cariyeler topluluğu" değil, hanedanın kendisinin yaşadığı, kendi iç hiyerarşisi, eğitim düzeni ve bütçesi olan kapsamlı bir saray dairesiydi.

Harem'in başında Valide Sultan (padişahın annesi) bulunur, onun altında kethüda kadın ve usta kalfalar aracılığıyla işleyen katı bir kıdem sistemi vardı; cariyeler de tıpkı Enderun'daki iç oğlanlar gibi müzik, dikiş, edebiyat gibi konularda eğitilir, yetenekli olanlar zamanla kalfalığa, hatta padişahın gözdesi ya da haseki sultanı olmaya kadar yükselebilirdi. 16. yüzyıl sonundan itibaren bazı valide sultanların devlet işlerine doğrudan müdahil olduğu dönem, tarihçiler tarafından "Kadınlar Saltanatı" olarak anılır ve bu dönem, Harem'in yalnızca özel bir yaşam alanı değil, aynı zamanda gerçek bir siyasi güç merkezi olabildiğini gösterir.`,
  },
  {
    order: 9,
    topic: 'Vakıf Sistemi',
    title: 'Hayır İçin Kurulan Devlet: Vakıf Sistemi',
    summary: 'Cami, imaret, hastane ve köprüleri finanse eden, özel mülkün kamu hizmetine dönüştüğü sistem.',
    text: `Vakıf, bir kişinin kendi mal varlığının bir kısmını (bir arazi, dükkân ya da gelir kaynağı) dinî veya hayrî bir amaca -örneğin bir caminin, medresenin, imaretin ya da çeşmenin sürekli finansmanına- kalıcı ve geri alınamaz biçimde tahsis etmesiydi. Osmanlı şehirlerindeki hemen her büyük külliye -cami, medrese, imaret, hastane, kütüphane, hamam- aslında kurucusunun (çoğunlukla padişah ya da üst düzey bir devlet adamının) kurduğu bir vakfın geliriyle işletiliyordu; vakıf senedinde (vakfiye) hizmetin nasıl yürütüleceği, kaç kişinin çalışacağı, hangi yemeklerin dağıtılacağı en ince ayrıntısına kadar tarif edilirdi.

Vakıf sistemi, merkezi devlet bütçesine yük olmadan kamusal hizmetlerin (eğitim, sağlık, sosyal yardım, altyapı) sürdürülmesini sağlayan, bugünkü anlamda bir "sivil toplum" ve kamu hizmeti finansman modeline benzeyen özgün bir mekanizmaydı; imparatorluğun pek çok yerinde yol, köprü, çeşme ve kervansaraylar da vakıf gelirleriyle yapılıp bakımı sağlanırdı. Zaman zaman zengin aileler, mallarını miras veya müsadereden korumak amacıyla da "aile vakıfları" kurdu; bu da vakıf kurumunun yalnızca hayır değil, aynı zamanda bir mülkiyet güvencesi aracı olarak da kullanıldığını gösterir. Vakıflar, kurumun bugünkü halefi olan Vakıflar Genel Müdürlüğü aracılığıyla hâlâ Türkiye'de varlığını sürdürmektedir.`,
  },
  {
    order: 10,
    topic: 'Donanma ve Tersane-i Amire',
    title: 'Akdeniz\'in Hakimi: Donanma ve Tersane-i Amire',
    summary: 'İmparatorluğun deniz gücünü üreten merkez: Haliç kıyısındaki devasa tersane kompleksi.',
    text: `Tersane-i Amire, Haliç kıyısında kurulan ve döneminin en büyük gemi inşa komplekslerinden biri haline gelen devlet tersanesiydi; burada yüzlerce kalyon ve kadırga aynı anda inşa edilebilir, binlerce usta, marangoz, halatçı ve demirci bu devasa organizasyonda çalışırdı. Kanuni Sultan Süleyman döneminde, özellikle Barbaros Hayreddin Paşa'nın kaptan-ı deryalığı sırasında, tersanenin üretim kapasitesi Akdeniz'deki hiçbir rakibiyle kıyaslanamayacak ölçeğe ulaştı.

Donanmanın komutası kaptan-ı deryaya aitti; bu makam zamanla yalnızca askeri değil, idari olarak da Cezayir-i Bahr-i Sefid (Akdeniz Adaları) eyaletinin valiliğini de kapsayacak kadar genişledi. 1571'deki İnebahtı yenilgisinin ardından tüm donanmanın birkaç ay içinde yeniden inşa edilebilmesi, Tersane-i Amire'nin üretim gücünün en çarpıcı kanıtlarından biri olarak tarihe geçti. 18. yüzyıldan itibaren yelkenli gemi teknolojisinde Avrupa'nın hızla öne geçmesiyle Osmanlı donanması eski üstünlüğünü yitirmeye başladı; III. Selim ve II. Mahmud dönemlerindeki modernleşme çabalarıyla tersane yeniden canlandırılmaya çalışıldıysa da, 19. yüzyıl boyunca Avrupa'yla teknolojik makas giderek açıldı.`,
  },
];
