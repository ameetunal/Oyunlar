// Bilim insanı/âlim profil verisi. Anahtarlar scientists.js içindeki
// "name" alanıyla birebir eşleşir. Her profil bir bilgi kutusu (doğum/
// ölüm, alanı, dönemi, başlıca eserleri, mirası) ve ardından hayatını ve
// çalışmalarını anlatan 2 paragraflık bir metin içerir.
export const scientistProfiles = {
  'Molla Fenari': {
    born: '1350, Bursa (veya Karaman)',
    died: '1431, Bursa',
    field: 'Filozof, Hukukçu ve İlk Şeyhülislam',
    era: 'I. Bayezid, I. Mehmed ve II. Murad dönemleri',
    majorWorks: 'Fusulü\'l-Bedayi (usul-i fıkıh üzerine), mantık ve tefsir alanında çok sayıda şerh ve haşiye',
    legacy: 'Osmanlı\'nın ilmiye teşkilatının kurucu isimlerinden, ilk resmî şeyhülislam',
    text: `Molla Fenari, Mısır ve İran'daki büyük medreselerde felsefe, mantık ve fıkıh eğitimi aldıktan sonra Anadolu'ya dönerek Bursa'da ders vermeye başladı. Döneminin en derin İslam hukuku ve felsefe bilgisine sahip âlimlerinden biri olarak tanınıyordu; eserleri yüzyıllarca Osmanlı medreselerinde ders kitabı olarak okutuldu.

II. Murad döneminde kendisine verilen "şeyhülislam" unvanı, Osmanlı'da bu makamın ilk resmî örneği kabul edilir; bu, devletin dinî ve hukuki otoritesinin kurumsallaşma sürecinde önemli bir adımdı. Molla Fenari'nin mantık ve fıkıh usulü üzerine yazdığı eserler, yalnızca Osmanlı'da değil, geniş İslam dünyasında da asırlarca referans kaynağı olarak kullanıldı; bu yönüyle o, Osmanlı ilim geleneğinin Bursa döneminde attığı en sağlam entelektüel temellerden birini temsil eder.`,
  },

  'Kadızade-i Rumi': {
    born: '1364, Bursa',
    died: '1436 civarı, Semerkant',
    field: 'Matematikçi ve Astronom',
    era: 'I. Bayezid dönemi (Anadolu\'dan ayrılışı) ve sonrasında Timurlu sarayı',
    majorWorks: 'Semerkant Rasathanesi\'nin kurucu ekibinde yer alması, trigonometri ve geometri üzerine şerhler',
    legacy: 'Bursa\'dan çıkıp Orta Asya\'nın en büyük bilim merkezine ulaşan, Ali Kuşçu\'yu yetiştiren usta',
    text: `Kadızade-i Rumi, Bursa'da başladığı eğitimine Semerkant'ta devam etti ve orada dönemin en parlak bilim merkezlerinden birinin, Timurlu hükümdarı ve aynı zamanda usta bir matematikçi olan Uluğ Bey'in himayesindeki akademinin önde gelen üyelerinden biri haline geldi. Öklid geometrisi ve trigonometri üzerine yazdığı şerhler, dönemin İslam dünyasında bu alanların en gelişmiş çalışmaları arasında sayılır.

Uluğ Bey'in 1420'lerde kurduğu Semerkant Rasathanesi'nin kuruluş sürecinde doğrudan rol oynadı; bu rasathane, dönemin en hassas yıldız kataloglarından birini üretecek kadar ileri bir gözlem programı yürütüyordu. Kadızade-i Rumi'nin belki de en kalıcı mirası, kendisinden ders alan ve daha sonra bu rasathanenin başına geçen Ali Kuşçu'yu yetiştirmiş olmasıdır — bu bilgi zinciri, bir kuşak sonra Ali Kuşçu'nun İstanbul'a gelişiyle doğrudan Osmanlı bilim hayatına da taşınmış oldu.`,
  },

  'Şerafeddin Sabuncuoğlu': {
    born: '1385, Amasya',
    died: '1468 civarı, Amasya',
    field: 'Cerrah ve Hekim',
    era: 'II. Murad ve II. Mehmed (Fatih) dönemleri',
    majorWorks: 'Cerrahiyyetü\'l-Haniyye (Osmanlı\'nın ilk resimli cerrahi atlası), Mücerrebname (tıbbi tecrübeler derlemesi)',
    legacy: 'Osmanlı tıp tarihinin resimli anatomi ve cerrahi alanındaki öncü ismi',
    text: `Şerafeddin Sabuncuoğlu, seksenli yaşlarında, hayatı boyunca edindiği tıbbi bilgi ve tecrübeyi sistemli biçimde kayda geçirme kararı aldı ve bunun sonucunda Osmanlı tıp tarihinin en özgün eserlerinden biri olan Cerrahiyyetü'l-Haniyye'yi kaleme aldı. Bu eser, önceki İslam tıp geleneğinden (özellikle Endülüslü hekim Zehravi'den) yararlansa da, kendi klinik gözlemlerini ve yeniliklerini de içeriyordu.

Eserin en özgün yanı, dönemi için son derece nadir olan renkli anatomik ve cerrahi çizimlerdi; ameliyat aletleri, hastanın pozisyonu ve müdahale adımları görsel olarak ayrıntılandırılmıştı — bu da eseri yalnızca bir metin değil, aynı zamanda pratik bir cerrahi rehber haline getiriyordu. Kadın hastalıkları, göz cerrahisi ve kırık-çıkık tedavisi gibi konularda yazdığı bölümler, dönemin tıbbi pratiğine dair bugün elimizdeki en zengin birincil kaynaklardan birini oluşturur.`,
  },

  'Akşemseddin': {
    born: '1389, Şam (bazı kaynaklara göre Amasya)',
    died: '1459, Göynük',
    field: 'Âlim, Hekim ve Mutasavvıf',
    era: 'II. Murad ve II. Mehmed (Fatih) dönemleri',
    majorWorks: 'Maddet\'ül-Hayat (bulaşıcı hastalıklar üzerine risale), çok sayıda tasavvufi ve dinî eser',
    legacy: 'Fatih\'in hem manevi hem entelektüel hocası; İstanbul kuşatmasında ordunun moral kaynağı',
    text: `Akşemseddin, hem güçlü bir tasavvuf âlimi hem de döneminin ileri düzey bir hekimiydi; II. Murad'ın oğlu şehzade Mehmed'in (sonraki Fatih) eğitimiyle görevlendirilmesi, onu Osmanlı sarayının en etkili isimlerinden biri haline getirdi. Genç şehzedeye hem dinî hem de idari konularda rehberlik etti ve onun İstanbul'u fethetme konusundaki kararlılığını manevi olarak destekledi.

1453 kuşatması sırasında ordunun içinde bulunarak askerlerin moralini yüksek tuttuğu, hatta kuşatmanın kritik anlarında Fatih'e doğrudan tavsiyelerde bulunduğu rivayet edilir. Tıp alanındaki en dikkat çekici katkısı ise, hastalıkların gözle görülemeyen çok küçük "tohumlar" ya da canlılar aracılığıyla bulaştığını öne süren gözlemleridir — bu fikir, mikrop teorisinin Avrupa'da bilimsel olarak kanıtlanmasından yüzyıllar önce, sezgisel ama dikkat çekici derecede ileri görüşlü bir gözlemdi.`,
  },

  'Ali Kuşçu': {
    born: '1403, Semerkant',
    died: '1474, İstanbul',
    field: 'Matematikçi ve Astronom',
    era: 'II. Mehmed (Fatih) dönemi',
    majorWorks: 'Semerkant Rasathanesi\'ndeki yıldız katalogları, Risale fi\'l-Hey\'e (astronomi üzerine), Ayasofya medresesindeki matematik-astronomi müfredatının kurulması',
    legacy: 'Semerkant\'ın ileri bilim geleneğini doğrudan İstanbul\'a taşıyan, Osmanlı\'da matematik-astronomi okulunun kurucusu',
    text: `Ali Kuşçu, Semerkant'ta Uluğ Bey'in rasathanesinde yetişmiş, hocası Kadızade-i Rumi'nin ölümünden sonra bu rasathanenin başına geçecek kadar güvenilen bir bilim insanıydı. Uluğ Bey'in 1449'da öldürülmesinin ardından Orta Asya'daki siyasi istikrarsızlık nedeniyle bölgeyi terk etmek zorunda kaldı ve uzun bir yolculuğun ardından Fatih Sultan Mehmed'in daveti üzerine İstanbul'a yerleşti.

Fatih, onu Ayasofya'daki medresede baş müderris olarak görevlendirdi; burada geliştirdiği matematik ve astronomi müfredatı, Osmanlı ilmiye sisteminde bu alanların sistemli biçimde okutulmasının başlangıcı oldu. Ali Kuşçu'nun getirdiği bilgi birikimi, yalnızca teorik astronomiyle sınırlı kalmadı — küresel trigonometri ve gözlemsel astronomi yöntemleri de dahil olmak üzere, Semerkant'ın ileri bilimsel mirasını doğrudan Osmanlı başkentine taşımış oldu. Onun İstanbul'a gelişi, şehrin fetihten hemen sonra yalnızca siyasi değil, aynı zamanda bilimsel bir merkez olma iddiasının da somut bir göstergesiydi.`,
  },

  'Takiyüddin': {
    born: '1521, Şam veya Kahire',
    died: '1585, İstanbul',
    field: 'Astronom ve Mühendis',
    era: 'III. Murad dönemi',
    majorWorks: 'İstanbul Rasathanesi\'nin kuruluşu, Sidretü\'l-Münteha (yıldız katalogları), mekanik saatler üzerine çalışmalar',
    legacy: 'Osmanlı\'nın en gelişmiş gözlem aletlerini tasarlayan, kısa ömürlü İstanbul Rasathanesi\'nin kurucusu',
    text: `Takiyüddin, Şam ve Kahire'deki eğitiminin ardından İstanbul'a gelerek baş müneccimliğe (saray astronomu) kadar yükseldi. III. Murad'ın desteğiyle 1577'de Galata sırtlarında, döneminin en gelişmiş gözlem aletleriyle donatılmış bir rasathane kurdu; bu rasathane, aynı dönemde Avrupa'da çalışan Danimarkalı astronom Tycho Brahe'nin rasathanesiyle kıyaslanabilecek düzeyde ileri bir yapıydı.

Takiyüddin ayrıca mekanik saatler üzerine yaptığı özgün çalışmalarla da tanınır; yay mekanizmalı saatlerin hassasiyetini artırmaya yönelik tasarımları, dönemin Avrupa saat yapımcılığıyla kıyaslanabilir bir düzeydeydi. Ne yazık ki rasathane, bazı din adamlarının bir kuyruklu yıldızı uğursuzlukla ilişkilendirip padişahı ikna etmesi üzerine, kuruluşundan yalnızca birkaç yıl sonra 1580'de yıktırıldı; bu olay, Osmanlı bilim tarihinde kurumsal bilimin siyasi ve dinî baskılarla nasıl kesintiye uğrayabileceğinin en çarpıcı örneklerinden biri olarak anılır.`,
  },

  'Kâtip Çelebi': {
    born: '1609, İstanbul',
    died: '1657, İstanbul',
    field: 'Bibliyograf, Coğrafyacı ve Tarihçi',
    era: 'IV. Murad ve IV. Mehmed (Avcı) dönemleri',
    majorWorks: 'Keşfü\'z-Zünun (bibliyografik ansiklopedi), Cihannüma (coğrafya ansiklopedisi), Fezleke (tarih eseri)',
    legacy: 'Osmanlı\'nın en üretken ve çok yönlü bilgi derleyicisi, modern ansiklopedik yaklaşımın öncüsü',
    text: `Kâtip Çelebi (Hacı Halife olarak da bilinir), önce kalemiye bürokrasisinde çalıştı, ardından hayatını neredeyse tamamen okumaya ve yazmaya adadı. En büyük eseri Keşfü'z-Zünun, on beş bin civarında kitabı ve on binlerce yazarı alfabetik olarak listeleyip özetleyen devasa bir bibliyografik ansiklopediydi — bu eser, kendi döneminde İslam dünyasının en kapsamlı "bilgi haritası" sayılırdı.

Coğrafya alanındaki başyapıtı Cihannüma'da, geleneksel İslam coğrafya kaynaklarının yanı sıra Avrupa'dan gelen yeni haritaları ve keşif bilgilerini de kullanarak, döneminin Osmanlı entelektüel çevresinde nadir görülen bir açıklıkla dünyayı tasvir etti. Kâtip Çelebi'nin bu tutumu -Doğu ve Batı kaynaklarını eleştirel biçimde bir araya getirme- onu yalnızca bir derleyici değil, aynı zamanda Osmanlı düşünce tarihinde metodolojik açıdan öne çıkan, gerçek anlamda ansiklopedik bir bilgin yapar.`,
  },

  'Evliya Çelebi': {
    born: '1611, İstanbul',
    died: '1682 civarı, Kahire',
    field: 'Gezgin ve Yazar',
    era: 'IV. Murad\'dan IV. Mehmed\'e (Avcı) uzanan dönem',
    majorWorks: 'Seyahatname (on ciltlik gezi ve gözlem eseri)',
    legacy: 'Kırk yılı aşkın gezisiyle Osmanlı coğrafyasının ve komşu ülkelerin en kapsamlı gözlemsel kaydını bırakan yazar',
    text: `Evliya Çelebi, İstanbul'daki iyi bir eğitimin ardından, kendi ifadesiyle bir rüyasında Hz. Muhammed'den aldığı işaretle çıktığı söylenen bir gezi tutkusuna kapıldı ve kırk yılı aşkın süre boyunca Osmanlı topraklarının hemen her köşesini, ayrıca Avusturya'dan İran'a, Kırım'dan Sudan'a uzanan komşu bölgeleri dolaştı. Bu gezileri sırasında gördüğü her şehri; mimarisini, nüfusunu, geleneklerini, dilini ve hatta yerel fıkralarını ayrıntılarıyla not etti.

Bu notlar, on ciltlik devasa bir eser olan Seyahatname'de toplandı — bu eser, kuru bir coğrafya kaydından çok, canlı bir üslupla yazılmış, zaman zaman abartılı ve hikâyeleştirilmiş ama yine de tarihçiler için paha biçilmez bir birincil kaynak niteliğindedir. Evliya Çelebi'nin gözlemleri sayesinde bugün 17. yüzyıl Osmanlı şehirlerinin günlük hayatı, esnaf düzeni, dil çeşitliliği ve toplumsal dokusu hakkında başka hiçbir kaynakta bulunmayan ayrıntılara sahibiz; bu yönüyle o, bir gezgin olduğu kadar erken bir antropolog ve etnograf olarak da değerlendirilir.`,
  },

  'Hezarfen Ahmed Çelebi': {
    born: '17. yüzyıl başı, İstanbul',
    died: '17. yüzyıl ortası, Cezayir\'e sürgün sonrası',
    field: 'Havacılık Öncüsü',
    era: 'IV. Murad dönemi',
    majorWorks: 'Takma kanatlarla Galata Kulesi\'nden Üsküdar\'a süzülme denemesi (rivayet edilen)',
    legacy: 'Osmanlı kaynaklarında anlatılan, insan gücüyle uçma denemelerinin en eski örneklerinden biri olarak anılan isim',
    text: `Hezarfen Ahmed Çelebi hakkındaki bilgilerin neredeyse tamamı, çağdaşı Evliya Çelebi'nin Seyahatname'sindeki anlatıma dayanır. Bu anlatıma göre Hezarfen Ahmed Çelebi, kendi tasarladığı takma kanatlarla Galata Kulesi'nin tepesinden atlayarak süzülmüş ve rüzgârın da yardımıyla Boğaz'ı aşıp Üsküdar'a, Doğancılar Meydanı'na inmeyi başarmıştır.

Bu olay, tarihçiler arasında hâlâ tartışma konusudur; bazıları bunu tam anlamıyla gerçekleşmiş bir planörle süzülme denemesi olarak yorumlarken, bazıları Evliya Çelebi'nin anlatı üslubundaki abartı eğilimini göz önünde bulundurarak temkinli yaklaşır. Ancak kaynağın güvenilirliği tartışmalı olsa da, bu anlatı Osmanlı toplumunda uçma fikrinin 17. yüzyılda zaten hayal gücünü meşgul ettiğini gösterir; rivayete göre IV. Murad başlangıçta bu başarıyı ödüllendirmiş, ancak "tehlikeli" bulunan bu yeteneğinden çekinerek Hezarfen Ahmed Çelebi'yi daha sonra Cezayir'e sürgün etmiştir.`,
  },

  'Lagari Hasan Çelebi': {
    born: '17. yüzyıl, İstanbul (tahmini)',
    died: 'Bilinmiyor',
    field: 'Roket Öncüsü',
    era: 'IV. Murad dönemi',
    majorWorks: '1633\'te barutlu bir roketle havalanıp denize inme denemesi (rivayet edilen)',
    legacy: 'Osmanlı kaynaklarında anlatılan, insanlı roket denemesinin en eski örneklerinden biri olarak anılan isim',
    text: `Lagari Hasan Çelebi de, tıpkı çağdaşı Hezarfen Ahmed Çelebi gibi, hakkındaki bilgiler büyük ölçüde Evliya Çelebi'nin Seyahatname'sine dayanan bir isimdir. Anlatıya göre 1633'te, IV. Murad'ın kızı Kaya Sultan'ın doğumunu kutlamak amacıyla düzenlenen büyük bir şenlikte, yedi kanatlı, barutla doldurulmuş "fişek" biçiminde bir düzenekle Sarayburnu'ndan havalanmış ve barutun tükenmesiyle bir tür ilkel paraşütü andıran kanatlarla denize inerek yüzerek sahile ulaşmıştır.

İnişinin ardından padişahın huzuruna çıkıp "Padişahım, İsa'ya selam gönderiyorum" dediği ve bu esprili sözünün padişahı memnun ettiği rivayet edilir; kendisine bu başarısından dolayı bir miktar akçe ve sipahi ocağında bir görev verildiği anlatılır. Bu olay da, Hezarfen'in uçuşu gibi, tarihsel kesinliği tartışmalı ama Osmanlı toplumunun 17. yüzyılda barut teknolojisi ve uçma fikrine olan ilgisini gösteren çarpıcı bir anlatı olarak Osmanlı bilim ve teknoloji tarihinin en renkli sayfalarından birini oluşturur.`,
  },

  'İbrahim Müteferrika': {
    born: '1674, Kolojvar (bugünkü Romanya, Erdel bölgesi)',
    died: '1745, İstanbul',
    field: 'Matbaacı ve Çok Yönlü Âlim',
    era: 'III. Ahmed ve I. Mahmud dönemleri',
    majorWorks: 'Osmanlı\'da Türkçe harflerle basan ilk matbaanın (1727) kurulması, çok sayıda coğrafya ve tarih kitabının basımı',
    legacy: 'Osmanlı\'da matbaa devrimini başlatan, bilgiye erişimi kalıcı biçimde dönüştüren isim',
    text: `Macar kökenli olup gençliğinde Osmanlı topraklarına gelen ve İslam'ı benimseyen İbrahim Müteferrika, hem diplomatik hem entelektüel alanda çok yönlü bir kariyer inşa etti; Avrupa dillerine hâkimiyeti, onu devletin dış yazışmalarında da değerli kılıyordu. Ancak en kalıcı katkısı, Damat İbrahim Paşa'nın (Nevşehirli) desteğiyle 1727'de kurduğu matbaa oldu.

Bu matbaa, Osmanlı'da Arap harfleriyle Türkçe kitap basan ilk resmî girişimdi; dinî hassasiyetler nedeniyle Kur'an ve dinî metinlerin basımına izin verilmese de, matbaa tarih, coğrafya, dilbilgisi ve askeri konularda kitaplar yayımladı. Bastığı Cihannüma (Kâtip Çelebi'nin eserinin genişletilmiş baskısı) gibi eserler, dönemin en gelişmiş coğrafya bilgisini daha geniş bir okuyucu kitlesine ulaştırdı. Müteferrika'nın matbaası kendisinden sonra bir süre duraklasa da, attığı bu ilk adım, bir buçuk asır sonra Osmanlı'da patlayacak olan basın ve yayın hayatının doğrudan öncüsü oldu.`,
  },

  'Hoca İshak Efendi': {
    born: '1774, İstanbul (bazı kaynaklara göre Kavala)',
    died: '1836, Kahire',
    field: 'Matematikçi ve Mühendis',
    era: 'III. Selim, II. Mahmud dönemleri',
    majorWorks: 'Mecmua-i Ulûm-ı Riyaziye (modern matematik ve fen bilimleri ansiklopedisi)',
    legacy: 'Modern Batı biliminin terim ve kavramlarını sistemli biçimde Türkçeye kazandıran mühendishane hocası',
    text: `Hoca İshak Efendi, III. Selim'in başlattığı askeri modernleşme hareketinin bir parçası olan Mühendishane-i Berrî-i Hümayun'da (Kara Mühendishanesi) matematik ve fen bilimleri hocalığı yaptı. Avrupa dillerine olan hâkimiyeti sayesinde, dönemin Fransız ve İngiliz bilim kaynaklarını doğrudan takip edebiliyor, bunları Osmanlı öğrencilerine aktarabiliyordu.

En büyük katkısı, cebir, geometri, fizik ve kimya gibi modern bilim dallarının temel kavram ve terimlerini ilk kez sistemli biçimde Türkçeye kazandırdığı Mecmua-i Ulûm-ı Riyaziye adlı devasa eseriydi; bugün hâlâ kullanılan pek çok matematik ve fen terimi, kökenini bu eserdeki Hoca İshak Efendi'nin tercih ettiği karşılıklara borçludur. Bu çalışma, Osmanlı'nın 19. yüzyıldaki askeri ve bilimsel modernleşmesinin dil ve kavram altyapısını kuran en önemli adımlardan biri olarak kabul edilir; kendisinden sonra yetişen mühendis ve subay kuşakları, büyük ölçüde onun kurduğu bu terminolojik zemin üzerinde eğitim gördü.`,
  },
};
