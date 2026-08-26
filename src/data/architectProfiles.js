// Mimar/sanatçı profil verisi. Anahtarlar architects.js içindeki "name"
// alanıyla birebir eşleşir. Her profil bir bilgi kutusu (doğum/ölüm, alanı,
// dönemi, başlıca eserleri, mirası) ve ardından hayatını ve sanatını
// anlatan 2 paragraflık bir metin içerir.
export const architectProfiles = {
  'Mimar Hayreddin': {
    born: 'Bilinmiyor (14. yüzyıl ortası)',
    died: 'Yaklaşık 1420\'ler',
    field: 'Mimar',
    era: 'I. Bayezid, I. Mehmed ve II. Murad dönemleri',
    majorWorks: 'Bursa\'da Yeşil Cami ve Yeşil Türbe',
    legacy: 'Osmanlı\'nın "Bursa dönemi" mimarisinin en olgun örneklerini bırakan, adı belgelerle bilinen ilk büyük saray mimarı',
    text: `Osmanlı mimarlık tarihinin belgelerle adı geçen ilk büyük ustalarından olan Mimar Hayreddin, devletin henüz Bursa merkezli küçük bir beylikten imparatorluğa dönüştüğü kritik bir eşikte çalıştı. Fetret Devri'nin kargaşasının ardından tahta çıkan I. Mehmed'in isteğiyle inşa ettiği Yeşil Cami ve Yeşil Türbe, çini işçiliğindeki incelik ve mekan kurgusundaki özgünlükle döneminin en iddialı yapıları oldu.

Yeşil Cami'nin cephesindeki mermer işçiliği ile iç mekandaki firuze-yeşil çinilerin uyumu, Selçuklu ve erken Osmanlı geleneklerini birleştirip kendine özgü bir "Bursa üslubu" yaratmıştı. Hayreddin'in bıraktığı bu miras, bir asır sonra Mimar Sinan'la zirveye ulaşacak Osmanlı cami mimarisinin ilk sağlam temellerinden birini oluşturur.`,
  },

  'Şeyh Hamdullah': {
    born: '1436, Amasya',
    died: '1520, İstanbul',
    field: 'Hattat',
    era: 'II. Bayezid ve I. Selim dönemleri',
    majorWorks: 'Sayısız Kur\'an-ı Kerim yazması, cami kitabeleri, "Aklâm-ı Sitte" (altı yazı çeşidi) üslubunun Osmanlı\'ya uyarlanması',
    legacy: '"Kıble-i küttab" (hattatların kıblesi) unvanıyla anılan, Osmanlı hat sanatının kurucu ismi',
    text: `Şeyh Hamdullah, Osmanlı sarayına Amasya'dan gelen bir hat üstadıydı ve şehzadeliği döneminden beri kendisini tanıyan II. Bayezid'in özel ilgisiyle İstanbul'da bambaşka bir konuma yükseldi. Rivayete göre padişah bizzat onun yanında kağıt tutup mürekkep hazırlayacak kadar hat sanatına ve bu ustaya değer veriyordu.

Kendisinden önceki Arap ve İran hat geleneklerini yeniden yorumlayarak daha sade, dengeli ve okunaklı bir "aklâm-ı sitte" (altı çeşit yazı) üslubu geliştirdi; bu üslup sonraki dört asır boyunca Osmanlı hattatlarının temel referansı oldu. Yazdığı Kur'an-ı Kerim nüshaları ve cami kitabeleri, günümüzde hâlâ Osmanlı hat sanatının başyapıtları arasında sayılır; kendisinden sonra gelen neredeyse her büyük hattat, onun "kıble-i küttab" (hattatların kıblesi) olarak anılan mirasına bir şekilde bağlanır.`,
  },

  'Piri Reis': {
    born: 'Yaklaşık 1465, Gelibolu',
    died: '1553, Mısır (idam)',
    field: 'Denizci ve Kartograf',
    era: 'II. Bayezid, I. Selim ve Kanuni Sultan Süleyman dönemleri',
    majorWorks: '1513 tarihli dünya haritası, Kitab-ı Bahriye (Akdeniz kılavuz kitabı)',
    legacy: 'Osmanlı denizcilik ve haritacılığının en özgün eseri sayılan Kitab-ı Bahriye\'nin yazarı',
    text: `Amcası ünlü korsan-amiral Kemal Reis'in yanında yetişen Piri Reis, hem usta bir denizci hem de titiz bir haritacıydı. 1513'te çizdiği ve bugün yalnızca bir parçası günümüze ulaşan dünya haritası, döneminin Portekiz ve İspanyol kaynaklarını da kullanarak Amerika kıtasının bilinen ilk Osmanlı haritalarından birini ortaya koyuyordu; haritanın günümüze kalan parçası, Amerika kıyılarını gösteren en eski belgelerden biri olarak dünya çapında tanınır.

Asıl kalıcı eseri ise Akdeniz'in liman, akıntı, sığlık ve rota bilgilerini ayrıntılarıyla anlatan Kitab-ı Bahriye oldu — bu eser hem pratik bir denizcilik kılavuzu hem de dönemin coğrafya bilgisini yansıtan bir başyapıttı. Kariyerinin sonunda, yaşlılığında katıldığı Basra Körfezi seferindeki bir geri çekilme kararı yüzünden görevi kötüye kullanmakla suçlanarak idam edildi; ölümünden asırlar sonra haritaları yeniden gün yüzüne çıktığında, dünya onun ne denli ileri görüşlü bir bilim insanı olduğunu anladı.`,
  },

  'Ahmed Karahisari': {
    born: '1468, Karahisar (Afyonkarahisar)',
    died: '1556, İstanbul',
    field: 'Hattat',
    era: 'Kanuni Sultan Süleyman dönemi',
    majorWorks: 'Süleymaniye Camii\'nin kubbe ve duvar kitabeleri, çok sayıda Kur\'an-ı Kerim yazması',
    legacy: 'Celi sülüs (büyük boy hat) üslubunda Osmanlı\'nın en özgün ustalarından biri',
    text: `Ahmed Karahisari, İran'da eğitim gördükten sonra İstanbul'a yerleşen ve burada kendi özgün üslubunu geliştiren bir hat ustasıydı. Özellikle büyük ölçekli "celi sülüs" yazılarındaki cesur, akıcı ve güçlü kompozisyonlarıyla döneminin diğer hattatlarından ayrılıyordu.

Kanuni Sultan Süleyman'ın emriyle inşa edilen Süleymaniye Camii'nin iç mekanındaki dev kitabeleri yazmakla görevlendirildi; kubbe eteğindeki ve duvarlardaki bu yazılar, mimari ile hat sanatının Osmanlı'da en görkemli biçimde buluştuğu örneklerden sayılır. Yaşlılığında görme yetisini kaybetmesine rağmen, öğrencisi ve manevi yeğeni Hasan Çelebi aracılığıyla çalışmalarını sürdürdüğü rivayet edilir; bıraktığı üslup, kendisinden sonraki nesillerce "Karahisari ekolü" olarak adlandırıldı.`,
  },

  'Matrakçı Nasuh': {
    born: 'Bilinmiyor (15. yüzyıl sonu, Bosna kökenli)',
    died: 'Yaklaşık 1564',
    field: 'Minyatür Sanatçısı, Matematikçi ve Tarihçi',
    era: 'Kanuni Sultan Süleyman dönemi',
    majorWorks: 'Beyan-ı Menazil (Irakeyn seferi güzergahının şehir minyatürleriyle belgelenmesi), matematik üzerine eserler',
    legacy: 'Osmanlı minyatüründe "topografik" (gerçekçi şehir tasviri) tarzın öncüsü',
    text: `Matrakçı Nasuh, çok yönlülüğüyle döneminin sıra dışı isimlerinden biriydi: hem başarılı bir matematikçi ve tarihçi, hem de "matrak" adı verilen bir askeri oyunu geliştirip bu oyunda ustalaştığı için lakabını kazanan bir asker-sanatçıydı. Kanuni'nin İran seferine (Irakeyn Seferi) bizzat katılarak geçtiği her şehri titizlikle gözlemledi.

Bu gözlemlerini Beyan-ı Menazil adlı eserinde, hayali ya da stilize değil gerçeğe yakın, kuşbakışı şehir minyatürleriyle kayda geçirdi — Bağdat, Halep, Tebriz gibi şehirlerin 16. yüzyıldaki görünümünü bugün büyük ölçüde onun sayesinde biliyoruz. Bu "topografik" tarz, Osmanlı minyatür sanatına daha önce görülmemiş bir belgesel gerçekçilik kazandırdı ve kendisinden sonraki askeri sefername minyatürlerine örnek oldu.`,
  },

  'Mimar Sinan': {
    born: '1489 veya 1490, Kayseri (Ağırnas)',
    died: '1588, İstanbul',
    field: 'Mimar',
    era: 'Kanuni Sultan Süleyman, II. Selim ve III. Murad dönemleri',
    majorWorks: 'Süleymaniye Camii, Selimiye Camii (Edirne), Şehzade Camii ve yüzlerce cami, köprü, kervansaray, hamam',
    legacy: 'Osmanlı klasik mimarisinin zirvesi kabul edilen, dünya mimarlık tarihinin en üretken ustalarından biri',
    text: `Devşirme yoluyla saraya alınıp önce Yeniçeri Ocağı'nda askeri mühendislik ve inşaat işlerinde yetişen Mimar Sinan, elli yaşına yaklaştığında "hassa başmimarı" (saray baş mimarı) görevine getirildi ve ölümüne kadar elli yılı aşkın süre bu görevde kaldı. Bu süre zarfında cami, medrese, köprü, su kemeri, hamam ve kervansaray dahil üç yüzü aşkın yapıya imza attı.

Kendisi Süleymaniye Camii'ni "çıraklık", Şehzade Camii'ni "kalfalık", Edirne'deki Selimiye Camii'ni ise "ustalık" eseri olarak tanımlamıştı — Selimiye'nin devasa kubbesi ve dört minaresiyle kurduğu denge, mühendislik ve estetiğin en olgun buluşması sayılır. Sinan'ın kubbeyi taşıyan strüktürü sadeleştirme, iç mekanı ışıkla bütünleştirme ve dış cepheyle iç hacmi uyumlu kılma konusundaki çözümleri, yalnızca Osmanlı'da değil dünya mimarlık tarihinde de klasikler arasında sayılır.`,
  },

  'Nakkaş Osman': {
    born: 'Bilinmiyor (16. yüzyıl ortası)',
    died: 'Bilinmiyor (16. yüzyıl sonu)',
    field: 'Minyatür Sanatçısı',
    era: 'II. Selim ve III. Murad dönemleri',
    majorWorks: 'Şehinşehname, Surname-i Hümayun, Hünername gibi büyük saray minyatür kitaplarının baş nakkaşlığı',
    legacy: 'Osmanlı saray minyatür atölyesinin en üretken ve etkili baş ustası',
    text: `Nakkaş Osman, III. Murad döneminde saray nakkaşhanesinin (minyatür atölyesi) başına geçerek, o dönemin en büyük tarih ve tören kitaplarının görsel programını yönetti. Onun yönetimindeki atölye, padişahların cülusundan sefer sahnelerine, şehzade sünnet düğünlerine kadar pek çok olayı canlı, ayrıntılı ve renkli minyatürlerle belgeledi.

Özellikle 1582'deki ünlü şehzade sünnet şenliğini elli iki gün boyunca resmeden Surname-i Hümayun, dönemin İstanbul'undaki gündelik yaşamı, esnaf loncalarını ve halk eğlencelerini görsel olarak kayıt altına alan eşsiz bir kaynaktır. Nakkaş Osman'ın yönetimindeki bu atölye geleneği, kendisinden sonra da devam ederek 17. yüzyıla kadar Osmanlı saray minyatürünün ana damarını oluşturdu.`,
  },

  'Mimar Davud Ağa': {
    born: 'Bilinmiyor',
    died: '1598, İstanbul',
    field: 'Mimar',
    era: 'III. Murad ve III. Mehmed dönemleri',
    majorWorks: 'Sinan\'ın son yıllarındaki eserlerinin tamamlanmasına katkı, kendi adına çeşitli cami ve çeşmeler',
    legacy: 'Sinan\'dan sonra hassa başmimarlığına getirilen ilk isim, ustasının geleneğini bir kuşak daha taşıyan mimar',
    text: `Mimar Davud Ağa, Sinan'ın atölyesinde yetişen ve ustasının 1588'deki ölümünün ardından hassa başmimarlığı görevini devralan isimdi. Sinan'ın yarım bıraktığı bazı projelerin tamamlanmasında ve onun kurduğu inşaat organizasyonunun sürdürülmesinde kilit bir rol oynadı.

Kendi adına yaptığı yapılar Sinan'ınkiler kadar anıtsal olmasa da, ustasının geliştirdiği kubbeli cami şemasını ve orantı anlayışını titizlikle sürdürdü. Görevi kısa sürse de (yaklaşık on yıl), Osmanlı saray mimarlığı teşkilatının Sinan sonrası dönemde kesintiye uğramadan devam etmesini sağlayan köprü isim olarak tarihe geçti.`,
  },

  'Sedefkar Mehmed Ağa': {
    born: '1540 civarı, Kavala veya İstanbul',
    died: '1617, İstanbul',
    field: 'Mimar',
    era: 'III. Murad, III. Mehmed ve I. Ahmed dönemleri',
    majorWorks: 'Sultanahmet Camii (Mavi Cami), çeşitli saray onarım ve inşaatları',
    legacy: 'Sinan sonrası Osmanlı mimarisinin en görkemli eseri olan Sultanahmet Camii\'nin mimarı',
    text: `Sedefkar Mehmed Ağa da Sinan'ın atölyesinde yetişmiş bir mimardı; adındaki "sedefkar" (sedef işçisi) unvanı, mimarlığa geçmeden önce sedef kakma sanatındaki ustalığından geliyordu. I. Ahmed'in emriyle, Bizans'ın kalbi Ayasofya'nın hemen karşısına, ona rakip olacak kadar görkemli bir cami inşa etmekle görevlendirildi.

1609-1616 arasında inşa edilen Sultanahmet Camii, altı minaresi (o dönemde bu sayı yalnızca Mekke'deki Kabe'de vardı ve tartışma yarattı), geniş avlusu ve iç mekandaki mavi-yeşil İznik çinileriyle "Mavi Cami" adıyla dünyaca tanındı. Mehmed Ağa, Sinan'ın kubbeli mekan anlayışını korurken iç aydınlatmayı ve çini süslemeyi öne çıkararak, ustasının mirasına kendi özgün katkısını eklemiş oldu.`,
  },

  'Hafız Osman': {
    born: '1642, İstanbul',
    died: '1698, İstanbul',
    field: 'Hattat',
    era: 'IV. Mehmed, II. Süleyman, II. Ahmed ve II. Mustafa dönemleri',
    majorWorks: 'Yirmiden fazla Kur\'an-ı Kerim yazması, hilye-i şerifeler, padişah tuğraları',
    legacy: 'Şeyh Hamdullah\'tan sonra Osmanlı hat sanatının ikinci büyük dönüm noktası kabul edilen usta',
    text: `Hafız Osman, küçük yaşta Kur'an'ı ezberlediği için aldığı "hafız" unvanını taşıyan, aynı zamanda çağının en yetenekli hattatı olan bir isimdi. Şeyh Hamdullah'ın iki asır önce kurduğu üslubu yeniden yorumlayarak daha zarif, akıcı ve orantılı bir yazı karakteri geliştirdi.

Bu yeni üslup o kadar etkili oldu ki, kendisinden sonraki neredeyse tüm Osmanlı hattatları "Hafız Osman ekolü" içinde yetişti; hatta yazdığı harfler basılı Kur'an-ı Kerim'lerde dahi örnek alındı. Padişah II. Mustafa'nın bizzat kendisinden hat dersleri aldığı bilinir. Onun mirası, Osmanlı hat sanatının 18. ve 19. yüzyıllardaki gelişiminin doğrudan temelini oluşturdu.`,
  },

  'Buhurizade Mustafa Itri': {
    born: '1640 civarı, İstanbul',
    died: '1712, İstanbul',
    field: 'Bestekar ve Hanende',
    era: 'IV. Mehmed, II. Süleyman, II. Ahmed, II. Mustafa ve III. Ahmed dönemleri',
    majorWorks: 'Segâh Tekbir, Neva-Kâr, çok sayıda din dışı ve dini beste',
    legacy: 'Osmanlı/Türk müziğinin tartışmasız en büyük bestekarlarından, eserleri hâlâ icra edilen nadir 17. yüzyıl sanatçısı',
    text: `Buhurizade Mustafa Itri, hem sarayda hem tekke çevrelerinde yetişmiş, döneminin en saygın müzisyeni ve hanendesiydi (okuyucu-bestekar). Klasik Osmanlı müziğinin makam ve usul sistemini en ileri düzeyde kullanan bestelerle, bu geleneğin adeta doruk noktasını temsil etti.

Bugün hâlâ her Kurban Bayramı'nda camilerde okunan Segâh Tekbir'i onun bestesidir — üç asırdan fazla süredir kesintisiz icra edilen bu eser, Osmanlı müzik mirasının günümüze ulaşan en canlı parçalarından biridir. Din dışı alanda bestelediği Neva-Kâr gibi eserler de klasik Türk müziği repertuvarının başyapıtları arasında sayılır. Itri'nin adı, bugün de konservatuvarlarda klasik Türk müziğinin en önemli referans noktalarından biri olarak anılmaya devam ediyor.`,
  },

  'Levni (Abdülcelil Çelebi)': {
    born: 'Bilinmiyor (17. yüzyıl sonu, Edirne)',
    died: '1732, İstanbul',
    field: 'Minyatür Sanatçısı ve Şair',
    era: 'III. Ahmed dönemi (Lale Devri)',
    majorWorks: 'Surname-i Vehbi (1720 şehzade sünnet şenliği minyatürleri), çok sayıda tek figür kadın-erkek portresi',
    legacy: 'Lale Devri\'nin zarif, renkli ve hareketli minyatür üslubunun yaratıcısı',
    text: `Levni, adını Edirne'de doğduğu için aldığı "lale" (Farsça "levni" kelimesi renk anlamına da gelir) mahlasıyla tanınan bir saray nakkaşıydı. III. Ahmed döneminin, savaşların durduğu, sarayın Batı zevkine ve eğlenceye ilgi duyduğu "Lale Devri"nin görsel dilini adeta o yarattı.

1720'de düzenlenen büyük şehzade sünnet şenliğini resmeden Surname-i Vehbi'deki minyatürlerinde, önceki nesillerin daha şematik figürlerinden farklı olarak hareketli bedenler, gerçekçi yüz ifadeleri ve zengin bir renk paleti kullandı. Ayrıca tek başına duran, günlük kıyafetli kadın ve erkek figürlerini resmettiği "tek figür" portreleriyle Osmanlı minyatüründe yeni bir tür başlattı; bu eserler bugün Topkapı Sarayı Müzesi'nin en çok sergilenen parçaları arasındadır.`,
  },

  'Hammamizade İsmail Dede Efendi': {
    born: '1778, İstanbul',
    died: '1846, Mekke (hac sırasında, veba salgınında)',
    field: 'Bestekar',
    era: 'III. Selim, II. Mahmud ve Abdülmecid dönemleri',
    majorWorks: 'Yüzlerce beste; "Hüzzam Saz Semaisi" ve çeşitli dini-din dışı eserler',
    legacy: 'Klasik Osmanlı müziğinin son büyük ustası, hem tekke hem saray müziğinde eser veren nadir bestekar',
    text: `İsmail Dede Efendi, kendisi de iyi bir bestekar olan III. Selim'in himayesinde yetişti ve onun müzik meclislerinde döneminin en yetenekli isimlerinden biri olarak öne çıktı. Hem Mevlevi tekkesindeki dini müzik geleneğinden hem de saray çevresindeki din dışı müzik zevkinden beslenerek çok yönlü bir bestekar oldu.

III. Selim'in tahttan indirilip öldürülmesinin ardından geçirdiği zor yıllara rağmen üretkenliğini sürdürdü ve II. Mahmud döneminde yeniden saraya yakınlaştı. Klasik Osmanlı müziğinin "son büyük ustası" olarak anılır; ondan sonra hem Batı müziğinin artan etkisi hem de değişen saray zevki, klasik formun eskisi gibi üretilmesini güçleştirdi. 1846'da hacca giderken Mekke'de veba salgınında hayatını kaybetmesi, klasik dönemin sembolik bir kapanışı olarak görülür.`,
  },

  'Mimar Kemalettin Bey': {
    born: '1870, İstanbul',
    died: '1927, Ankara',
    field: 'Mimar',
    era: 'II. Abdülhamid, V. Mehmed, VI. Mehmed dönemleri ve erken Cumhuriyet',
    majorWorks: 'Vakıf Han (İstanbul), Bebek Camii, Gazi Üniversitesi binası (Ankara), çok sayıda kamu yapısı',
    legacy: '"Birinci Ulusal Mimarlık Akımı"nın kurucusu, klasik Osmanlı motiflerini modern yapı teknikleriyle birleştiren mimar',
    text: `Mimar Kemalettin Bey, Osmanlı'nın son döneminde Avrupa'da mimarlık eğitimi alan ve dönüşünde hem Batı'nın modern inşaat tekniklerini hem de klasik Osmanlı-Selçuklu mimari motiflerini bir araya getiren yeni bir üslup arayan bir kuşağın öncüsüydü. Bu arayış, tarihe "Birinci Ulusal Mimarlık Akımı" olarak geçti.

Kemer, kubbe ve çini gibi geleneksel unsurları betonarme gibi modern yapı teknikleriyle birleştirerek İstanbul'da Vakıf Han gibi büyük ticari yapılar, çeşitli camiler ve okullar inşa etti. İmparatorluğun çöküşünden Cumhuriyet'in kuruluşuna uzanan geçiş döneminde çalışmaya devam eden Kemalettin Bey, hayatının son yıllarında Ankara'da yeni başkentin kamu binalarının tasarımına katkıda bulundu — böylece kariyeri, Osmanlı mimarisinin son temsilcisi ile Cumhuriyet mimarisinin ilk kuşağı arasında bir köprü kurmuş oldu.`,
  },
};
