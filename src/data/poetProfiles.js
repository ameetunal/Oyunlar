// Divan şairi profil verisi. Anahtarlar poets.js içindeki "name" alanıyla
// birebir eşleşir. Her profil bir bilgi kutusu (doğum/ölüm, dönemi,
// başlıca eserleri, üslubu, mirası) ve ardından hayatını ve şiirini
// anlatan 2 paragraflık bir metin içerir.
export const poetProfiles = {
  Fuzuli: {
    born: '1483 civarı, Kerbela (bugünkü Irak)',
    died: '1556, Kerbela',
    era: 'Yavuz Sultan Selim ve Kanuni Sultan Süleyman dönemleri',
    majorWorks: 'Leyla vü Mecnun (mesnevi), Şikayetname (mektup-hiciv), Türkçe, Farsça ve Arapça divanlar',
    style: 'Derin bir aşk ve tasavvuf duygusunu son derece akıcı, duygusal bir dille işleyen bir üslup',
    legacy: 'Osmanlı, İran ve Azerbaycan edebiyatlarının ortak mirası sayılan, üç dilde de eser veren ender şairlerden',
    text: `Fuzuli, Bağdat'ın Osmanlı topraklarına katıldığı bir dönemde Kerbela çevresinde yaşadı ve hayatının büyük bölümünü İstanbul'dan uzakta, taşrada geçirdi; buna rağmen eserleri kısa sürede tüm Osmanlı coğrafyasında ve İran edebiyat çevrelerinde tanındı. Türkçe, Farsça ve Arapça olmak üzere üç dilde de divan oluşturacak kadar üretken ve çok yönlü bir şairdi.

En büyük eseri Leyla vü Mecnun, Arap edebiyatından gelen klasik bir aşk hikâyesini, son derece derin bir duygusal ve tasavvufi yorumla yeniden yazdığı bir mesneviydi; bu eser, Türk edebiyatında aşk temasının en yoğun ve etkileyici işlenişlerinden biri kabul edilir. Bağdat'ın fethinden sonra kendisine bağlanan cüzi bir maaşın ödenmesindeki bürokratik aksaklıkları ince bir alayla eleştirdiği Şikayetname ise, edebi mektup türünün en usta örneklerinden biri olarak edebiyat tarihine geçti.`,
  },

  Baki: {
    born: '1526, İstanbul',
    died: '1600, İstanbul',
    era: 'Kanuni Sultan Süleyman, II. Selim, III. Murad ve III. Mehmed dönemleri',
    majorWorks: 'Kanuni Mersiyesi (Kanuni Sultan Süleyman için yazılan ağıt), geniş bir divan',
    style: 'Dilin ahengini ve ölçüyü kusursuz kullanan, "gazel sultanı" olarak anılan klasik bir üslup',
    legacy: '"Sultanü\'ş-Şuara" (şairler sultanı) unvanıyla anılan, divan şiirinin biçimsel mükemmelliğinin doruğu sayılan isim',
    text: `Baki, alçakgönüllü bir ailenin çocuğu olarak İstanbul'da doğdu, medrese eğitimi görerek ilmiye sınıfına girdi ve kadılık görevlerinde bulundu. Şiirdeki olağanüstü yeteneği daha gençken fark edildi; Kanuni Sultan Süleyman'ın bizzat takdirini kazanarak saray çevresinde hızla tanınan bir isim oldu.

1566'da Kanuni'nin ölümü üzerine yazdığı Kanuni Mersiyesi, Türk edebiyatının en güçlü ağıtlarından biri kabul edilir; hem hükümdarın büyüklüğünü hem de ölümün kaçınılmazlığını işleyen bu şiir, biçim ve içerik uyumu açısından klasik dönemin başyapıtlarından sayılır. Baki'nin dile hakimiyeti, ölçüyü (aruzu) kusursuz kullanışı ve gazellerindeki ahenk, kendisinden sonraki nesiller tarafından da örnek alındı; bu nedenle "Sultanü'ş-Şuara" (şairler sultanı) unvanıyla anıldı ve divan şiirinin biçimsel mükemmelliğinin zirvesi olarak değerlendirildi.`,
  },

  "Nef'i": {
    born: '1572 civarı, Erzurum',
    died: '1635, İstanbul, idam',
    era: 'I. Ahmed, II. Osman, IV. Murad dönemleri',
    majorWorks: 'Siham-ı Kaza (hiciv derlemesi), padişahlar için yazdığı büyük kasideler',
    style: 'Güçlü, iddialı ve zaman zaman acımasız bir dille yazılmış kaside ve hiciv üslubu',
    legacy: 'Divan edebiyatının en güçlü kaside ustası, ama keskin diliyle kendi sonunu hazırlayan trajik bir figür',
    text: `Nef'i, Erzurum'dan İstanbul'a gelerek saray çevresinde tanınan bir şair oldu; özellikle padişahlar ve devlet büyükleri için yazdığı kasideler, döneminin en güçlü ve gösterişli örnekleri arasında sayılırdı. Ancak asıl ününü, aynı güçlü kalemle yazdığı acımasız hicivlerle kazandı.

Siham-ı Kaza adlı hiciv derlemesinde, devrin birçok devlet adamını ve hatta zaman zaman padişahları bile hedef alan keskin eleştiriler kaleme aldı; bu şiirler, dilinin gücü kadar yarattığı düşmanlıklarla da tanındı. Sonunda, hicivlerinden rahatsız olan bir devlet adamının kışkırtmasıyla IV. Murad'ın emriyle idam edildi — bu trajik son, onu divan edebiyatında hem en güçlü hem de en "tehlikeli" kalemlerden biri olarak tarihe geçirdi; Nef'i'nin kaderi, Osmanlı'da edebi eleştirinin bazen ne denli ağır bir bedele mal olabileceğinin çarpıcı bir örneğidir.`,
  },

  Nabi: {
    born: '1642, Urfa',
    died: '1712, İstanbul',
    era: 'IV. Mehmed (Avcı), II. Süleyman, II. Ahmed, II. Mustafa, III. Ahmed dönemleri',
    majorWorks: 'Hayriyye (oğluna öğütler mesnevisi), Hayrabad (mesnevi), geniş bir divan',
    style: '"Hikemi tarz" olarak anılan, şiiri toplumsal gözlem ve ahlaki öğütle birleştiren düşünsel bir üslup',
    legacy: 'Divan şiirine toplumsal eleştiri ve pratik hayat bilgeliğini kazandıran, "hikemi tarz"ın kurucusu',
    text: `Nabi, Urfa'dan İstanbul'a gelerek önce bürokraside, ardından uzun yıllar Halep'te önemli devlet görevlerinde bulundu; bu geniş taşra tecrübesi, onun şiirine İstanbul merkezli divan geleneğinden farklı, daha gözlemci ve pratik bir bakış açısı kazandırdı.

En özgün katkısı, "hikemi tarz" olarak anılan bir şiir üslubu geliştirmesiydi; bu üslupta aşk ve güzellik temaları yerine, toplumsal aksaklıklar, ahlaki öğütler ve hayat bilgeliği ön plana çıkıyordu. Oğluna hayat dersleri vermek amacıyla yazdığı Hayriyye adlı mesnevi, bu yaklaşımın en tanınmış örneğidir ve dönemin toplumsal ve bürokratik hayatına dair de zengin gözlemler içerir. Nabi'nin bu "düşünsel" şiir anlayışı, kendisinden sonra gelen pek çok şairi de etkileyerek divan edebiyatına yeni bir damar kazandırdı.`,
  },

  Nedim: {
    born: '1681 civarı, İstanbul',
    died: '1730, İstanbul',
    era: 'III. Ahmed dönemi (Lale Devri)',
    majorWorks: 'Geniş bir divan; İstanbul\'u ve Lale Devri eğlence hayatını konu alan şarkı ve gazeller',
    style: 'Sade, canlı ve mahalli renklerle zenginleşmiş, geleneksel divan diline günlük İstanbul Türkçesini katan bir üslup',
    legacy: 'Divan şiirini soyut kalıplardan çıkarıp somut, yerel ve gündelik bir dünyaya taşıyan Lale Devri\'nin şairi',
    text: `Nedim, iyi bir medrese eğitimi aldıktan sonra, Damat İbrahim Paşa'nın (Nevşehirli) himayesinde saray çevresine girdi ve kısa sürede Lale Devri'nin en parlak şairi haline geldi. Bu dönemin göreli barış ve refah ortamı, onun şiirlerine de yansıdı; kasvetli ya da ağır temalar yerine, İstanbul'un bahçelerini, eğlencelerini ve gündelik neşesini işleyen bir şiir dünyası kurdu.

Nedim'in en özgün katkısı, geleneksel divan şiirinin soyut ve kalıplaşmış İran kökenli imgelerini bir kenara bırakarak, yerine Boğaziçi'ni, Kağıthane'yi, İstanbul argosunu ve günlük konuşma diline yakın ifadeleri yerleştirmesiydi. Bu yaklaşım, onu divan şiiri geleneği içinde son derece özgün ve "yerli" bir ses haline getirdi. Patrona Halil İsyanı sırasında, himayecisi Damat İbrahim Paşa'nın öldürülmesinin ardından yaşanan kargaşada evinin damından düşerek öldüğü rivayet edilir — parlak ve neşeli bir dönemin şairi, o dönemin sona erişiyle aynı yıl hayatını kaybetmiş oldu.`,
  },

  'Şeyh Galib': {
    born: '1757, İstanbul',
    died: '1799, İstanbul',
    era: 'III. Selim dönemi',
    majorWorks: 'Hüsn ü Aşk (alegorik aşk mesnevisi), geniş bir divan',
    style: 'Son derece zengin ve orijinal imgelerle örülü, tasavvufi derinliği yüksek bir üslup',
    legacy: 'Divan edebiyatının son büyük ustası kabul edilen, klasik geleneği kendi özgün sesiyle taçlandıran şair',
    text: `Şeyh Galib, Mevlevi tarikatına mensup bir aileden geliyordu ve kendisi de zamanla Galata Mevlevihanesi'nin şeyhliğine kadar yükseldi; bu tasavvufi çevre, onun şiirine de derin bir mistik boyut kazandırdı. Reformcu padişah III. Selim'in de yakın çevresinde yer aldı; padişahın kendisi de bir bestekar ve sanatsever olduğu için ikisi arasında güçlü bir kültürel bağ oluştu.

En büyük eseri Hüsn ü Aşk (Güzellik ve Aşk), alegorik bir aşk hikâyesi üzerinden insanın manevi olgunlaşma yolculuğunu anlatan, son derece özgün imgeler ve derin bir tasavvufi sembolizmle örülü bir mesneviydi. Bu eser, hem dil hem içerik açısından o kadar yenilikçi ve etkileyici bulundu ki, pek çok edebiyat tarihçisi tarafından klasik Osmanlı divan edebiyatının son büyük başyapıtı ve bu geleneğin doruk noktası olarak kabul edilir; Şeyh Galib'den sonra divan şiiri, giderek yerini Tanzimat'la birlikte gelecek yeni edebi akımlara bırakacaktı.`,
  },
};
