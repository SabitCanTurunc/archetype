export interface LocalizedString {
  en: string;
  tr: string;
}

export interface ArchetypeContent {
  id: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  definesYou: LocalizedString[];
  blindSpot: LocalizedString;
  relationships: LocalizedString;
  underPressure: LocalizedString;
  contradiction: LocalizedString;
}

export const archetypeContents: Record<string, ArchetypeContent> = {
  OBSERVER: {
    id: "OBSERVER",
    name: { en: "The Observer", tr: "Gözlemci" },
    tagline: { 
      en: "You don't need more information. You need to know when you already have enough.",
      tr: "Daha fazla bilgiye değil, ne zaman yeterince bilgi edindiğini bilmeye ihtiyacın var."
    },
    description: {
      en: "You tend to observe before you act. Uncertainty does not necessarily make you move faster; it makes you look closer.",
      tr: "Harekete geçmeden önce gözlem yapma eğilimindesin. Belirsizlik seni hızlandırmaz; tam tersine daha yakından bakmanı sağlar."
    },
    definesYou: [
      { en: "You notice patterns before committing.", tr: "Bir şeye adım atmadan önce örüntüleri fark edersin." },
      { en: "You prefer understanding over reacting.", tr: "Anında tepki vermek yerine önce durumu anlamayı tercih edersin." },
      { en: "You rarely reveal everything at once.", tr: "Kendinle ilgili her şeyi nadiren tek seferde açık edersin." }
    ],
    blindSpot: {
      en: "Observation can become hesitation. The search for the right moment can sometimes become a reason to delay action.",
      tr: "Sürekli gözlem yapmak zamanla tereddüte dönüşebilir. Doğru anı beklemek, bazen harekete geçmeyi ertelemek için bir bahaneye dönüşebilir."
    },
    relationships: {
      en: "You tend to build trust gradually. You may appear distant at first, while internally paying close attention to the people around you.",
      tr: "Güveni zamanla, yavaş yavaş inşa edersin. Başlangıçta mesafeli görünebilirsin ama içten içe etrafındaki insanları çok dikkatli bir şekilde incelersin."
    },
    underPressure: {
      en: "When pressure increases, you may retreat into analysis and try to regain control by understanding the situation.",
      tr: "Baskı arttığında içine çekilip durumu analiz etmeye yönelebilir, her şeyi anlamlandırarak kontrolü geri kazanmaya çalışabilirsin."
    },
    contradiction: {
      en: "You may look detached from the outside while internally processing much more than people realize.",
      tr: "Dışarıdan olaylardan kopuk gibi görünsen de, aslında iç dünyanda insanların tahmin ettiğinden çok daha fazlasını işliyorsun."
    }
  },
  STRATEGIST: {
    id: "STRATEGIST",
    name: { en: "The Strategist", tr: "Stratejist" },
    tagline: {
      en: "You don't just want to move forward. You want to move in the right direction.",
      tr: "Sadece ilerlemek istemiyorsun. Doğru yöne doğru ilerlemek istiyorsun."
    },
    description: {
      en: "You tend to rely on structured thinking and intentional action. You prefer having a clear roadmap over leaving things to chance.",
      tr: "Planlı düşünmeyi ve bilinçli adımlar atmayı tercih edersin. Her şeyi şansa bırakmaktansa önünde net bir yol haritası olmasını seversin."
    },
    definesYou: [
      { en: "You focus on outcomes before methods.", tr: "Nasıl yapılacağından çok ne elde edileceğine odaklanırsın." },
      { en: "You often prefer structured environments.", tr: "Genellikle kuralları ve düzeni belli olan ortamları tercih edersin." },
      { en: "You value efficiency over spontaneity.", tr: "Verimliliği, anlık ve spontane gelişmelere tercih edersin." }
    ],
    blindSpot: {
      en: "Your desire for a perfect plan can sometimes prevent you from taking the first step. You may struggle when forced to act without a clear framework.",
      tr: "Kusursuz bir plan arzun bazen ilk adımı atmana engel olabilir. Belirli bir çerçeve olmadan harekete geçmen gerektiğinde zorlanabilirsin."
    },
    relationships: {
      en: "You tend to value reliability and clear communication. You often look for alignment in goals rather than just emotional connection.",
      tr: "Güvenilirliğe ve net iletişime değer verirsin. Sadece duygusal bir bağ kurmaktan öte, amaçların örtüşmesine dikkat edersin."
    },
    underPressure: {
      en: "When uncertainty increases, you may try to assert control by creating systems, rules, or rigid plans.",
      tr: "Belirsizlik arttığında sistemler, kurallar veya katı planlar kurarak kontrolü yeniden eline almaya çalışabilirsin."
    },
    contradiction: {
      en: "You may seem highly decisive, but you often spend significant time calculating your moves before making them visible.",
      tr: "Dışarıdan çok kararlı görünsen de, aslında hamlelerini açığa vurmadan önce uzun uzun hesaplarsın."
    }
  },
  DIPLOMAT: {
    id: "DIPLOMAT",
    name: { en: "The Diplomat", tr: "Diplomat" },
    tagline: {
      en: "You don't just seek answers. You seek harmony in the process.",
      tr: "Sadece cevapların peşinde değilsin. Oraya giden yolda uyum arıyorsun."
    },
    description: {
      en: "You tend to navigate situations by understanding different perspectives. You are often highly aware of how your actions impact others.",
      tr: "Olayları farklı bakış açılarını anlayarak yönetme eğilimindesin. Attığın adımların başkalarını nasıl etkilediğinin oldukça farkındasın."
    },
    definesYou: [
      { en: "You prioritize balance and consensus.", tr: "Dengeyi ve ortak noktada buluşmayı ön planda tutarsın." },
      { en: "You are often highly attuned to social dynamics.", tr: "Sosyal dinamikleri ve ortamın havasını kolayca sezersin." },
      { en: "You tend to seek solutions that benefit the group.", tr: "Genelde grubun tamamına fayda sağlayacak çözümler ararsın." }
    ],
    blindSpot: {
      en: "Your desire for harmony can sometimes mean compromising your own needs. You may avoid necessary conflict to keep the peace.",
      tr: "Uyum sağlama arzun bazen kendi ihtiyaçlarından taviz vermene neden olabilir. Sırf huzur bozulmasın diye gerekli yüzleşmelerden kaçınabilirsin."
    },
    relationships: {
      en: "You tend to be deeply empathetic and accommodating. You often act as the glue that holds groups together.",
      tr: "Son derece empatik ve uyumlusun. Çoğu zaman grupları bir arada tutan birleştirici güç olursun."
    },
    underPressure: {
      en: "When pressure increases, you may try to manage other people's emotions before addressing the actual problem.",
      tr: "Baskı arttığında, asıl sorunu çözmekten çok insanların hislerini yatıştırmaya odaklanabilirsin."
    },
    contradiction: {
      en: "You often appear highly accommodating, but you may harbor strong personal convictions that you rarely express directly.",
      tr: "Dışarıdan her şeye uyum sağlayan biri gibi görünsen de, aslında doğrudan dile getirmediğin çok güçlü şahsi inançların var."
    }
  },
  MAVERICK: {
    id: "MAVERICK",
    name: { en: "The Maverick", tr: "Aykırı" },
    tagline: {
      en: "You don't just question the rules. You wonder why they exist in the first place.",
      tr: "Kuralları sadece sorgulamıyorsun. En başta neden var olduklarını merak ediyorsun."
    },
    description: {
      en: "You tend to act instinctively and adapt quickly. You are often more comfortable with ambiguity than with strict constraints.",
      tr: "İçgüdülerinle hareket edip hızla adapte olursun. Kesin kurallar ve kısıtlamalar yerine, belirsizlik içinde çok daha rahatsın."
    },
    definesYou: [
      { en: "You prefer flexibility over structure.", tr: "Katı bir düzenden ziyade esnekliği tercih edersin." },
      { en: "You often trust your intuition over extensive analysis.", tr: "Genellikle uzun analizlerden çok içgüdülerine güvenirsin." },
      { en: "You are usually comfortable changing direction quickly.", tr: "Hızlı bir şekilde yön değiştirmek senin için çok kolaydır." }
    ],
    blindSpot: {
      en: "Your preference for rapid action can sometimes lead to overlooking important details. You may struggle with long-term consistency.",
      tr: "Hızlı hareket etme isteğin bazen önemli detayları atlamana yol açabilir. Uzun vadeli istikrar sağlamakta zorlanabilirsin."
    },
    relationships: {
      en: "You tend to value independence and spontaneity. You often connect best with those who give you the space to operate freely.",
      tr: "Bağımsızlığa ve doğallığa çok önem verirsin. Sana özgürce hareket edebileceğin o alanı tanıyan insanlarla en iyi bağı kurarsın."
    },
    underPressure: {
      en: "When pressure increases, you may become impulsive or completely disregard established procedures to find a quick way out.",
      tr: "Baskı arttığında daha dürtüsel davranabilir veya hızlı bir çıkış yolu bulmak için var olan tüm kuralları göz ardı edebilirsin."
    },
    contradiction: {
      en: "You often seem unbothered by risks, yet you may privately worry about the long-term consequences of your spontaneous choices.",
      tr: "Dışarıdan riskleri hiç umursamıyormuşsun gibi dursan da, içten içe anlık kararlarının uzun vadeli sonuçları hakkında endişelenirsin."
    }
  },
  EMPATH: {
    id: "EMPATH",
    name: { en: "The Empath", tr: "Empat" },
    tagline: {
      en: "You don't just observe what happens. You feel its impact.",
      tr: "Sadece olan biteni izlemezsin. Etkisini doğrudan hissedersin."
    },
    description: {
      en: "You tend to process the world through emotional resonance. You often have a deep understanding of the human element in any situation.",
      tr: "Dünyayı duygusal bir yankılanma ile algılarsın. Çoğu zaman herhangi bir olayın insani boyutunu derinlemesine anlarsın."
    },
    definesYou: [
      { en: "You are highly sensitive to the emotional climate.", tr: "Bulunduğun ortamın duygusal iklimine karşı çok hassassın." },
      { en: "You often prioritize human connection over pure logic.", tr: "Genellikle insan ilişkilerini saf mantığın önünde tutarsın." },
      { en: "You tend to be deeply intuitive about people's unspoken needs.", tr: "İnsanların dile getirmedikleri ihtiyaçlarını sezme konusunda çok başarılısın." }
    ],
    blindSpot: {
      en: "Your openness to others' feelings can sometimes lead to emotional exhaustion. You may struggle to establish firm boundaries.",
      tr: "Başkalarının duygularına bu kadar açık olman zamanla duygusal bir tükenmişliğe yol açabilir. Net sınırlar çizmekte zorlanabilirsin."
    },
    relationships: {
      en: "You tend to seek deep, authentic connections. You often provide a safe space for others to express themselves.",
      tr: "Derin ve gerçek bağlar ararsın. Çoğu zaman başkalarının kendilerini rahatça ifade edebilecekleri güvenli bir liman olursun."
    },
    underPressure: {
      en: "When uncertainty increases, you may become overwhelmed by the emotional weight of the situation rather than focusing on the practical steps.",
      tr: "Belirsizlik arttığında pratik adımlara odaklanmak yerine, durumun duygusal yükü altında ezildiğini hissedebilirsin."
    },
    contradiction: {
      en: "You often provide immense support to others, but you may find it incredibly difficult to ask for the same support in return.",
      tr: "Başkalarına her zaman büyük bir destek versen de, iş kendine gelince aynı desteği istemek senin için inanılmaz derecede zor olabilir."
    }
  },
  ENIGMA: {
    id: "ENIGMA",
    name: { en: "The Enigma", tr: "Gizem" },
    tagline: {
      en: "You don't fit into a single box. You adapt to what the moment requires.",
      tr: "Tek bir kalıba sığmıyorsun. O an ne gerektiriyorsa ona dönüşüyorsun."
    },
    description: {
      en: "You tend to exhibit a complex mix of traits that can seem contradictory. You often adapt your approach based on highly specific contexts.",
      tr: "Birbiriyle çelişiyor gibi görünen birçok özelliği içinde barındırırsın. Çoğu zaman tavrını tamamen içinde bulunduğun şartlara göre ayarlarsın."
    },
    definesYou: [
      { en: "You are highly adaptable and context-dependent.", tr: "Girdiği ortama göre şekil alabilen, son derece uyumlu birisin." },
      { en: "You often balance analytical thinking with strong intuition.", tr: "Güçlü içgüdülerini analitik düşünme yeteneğinle sık sık dengelersin." },
      { en: "You can comfortably operate in both structured and unstructured environments.", tr: "Hem çok kurallı hem de tamamen belirsiz ortamlarda rahatça var olabilirsin." }
    ],
    blindSpot: {
      en: "Your fluid nature can sometimes make it hard for others to know where you stand. You may occasionally struggle with a clear sense of consistent direction.",
      tr: "Sürekli değişebilen doğan, bazen insanların senin nerede durduğunu anlamasını zorlaştırır. Bazen kendine net ve değişmez bir yol çizmekte zorlanabilirsin."
    },
    relationships: {
      en: "You tend to be selective about which aspects of yourself you share. You often connect on different levels depending on the person.",
      tr: "Kendisinin hangi yönünü paylaşacağı konusunda seçici birisin. Farklı insanlarla farklı frekanslarda bağ kurarsın."
    },
    underPressure: {
      en: "When pressure increases, you may become unpredictable, shifting rapidly between different coping mechanisms.",
      tr: "Baskı arttığında tahmin edilemez birine dönüşebilir, hızlıca farklı başa çıkma yöntemleri arasında geçiş yapabilirsin."
    },
    contradiction: {
      en: "You often appear highly consistent to different groups of people, but you may feel completely different internally depending on the context.",
      tr: "Farklı insan gruplarına karşı çok tutarlı bir profil çizsen de, içinde bulunduğun duruma göre içten içe kendini bambaşka hissedebilirsin."
    }
  }
};
