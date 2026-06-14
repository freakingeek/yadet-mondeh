import type { Player, Question } from "./types";

type QuestionPrompt = {
  id: string;
  category: string;
  text: string;
};

const questionPrompts: QuestionPrompt[] = [
  // غذا
  { id: "food-01", category: "غذا", text: "چیزی که وقتی {X} ناراحته میره سراغش" },
  { id: "food-02", category: "غذا", text: "غذایی که {X} حاضره نصف شب برای خوردنش از خونه بزنه بیرون" },
  { id: "food-03", category: "غذا", text: "غذایی که {X} فکر می‌کنه بهترین غذای دنیاست" },
  { id: "food-04", category: "غذا", text: "اولین چیزی که {X} توی یه رستوران جدید سفارش میده" },
  { id: "food-05", category: "غذا", text: "غذایی که {X} از بچگی عاشقشه" },
  { id: "food-06", category: "غذا", text: "چیزی که {X} وقتی خوشحاله جشن می‌گیره باهاش" },
  { id: "food-07", category: "غذا", text: "تنها غذایی که {X} هیچ‌وقت ازش سیر نمیشه" },
  { id: "food-08", category: "غذا", text: "غذایی که {X} به همه توصیه می‌کنه" },
  { id: "food-09", category: "غذا", text: "اولین چیزی که {X} وقتی گشنشه به ذهنش میرسه" },
  { id: "food-10", category: "غذا", text: "غذایی که {X} حاضره برای خوردنش صف بایسته" },
  { id: "food-11", category: "غذا", text: "چیزی که {X} وقتی دلش گرفته می‌پزه یا سفارش میده" },
  { id: "food-12", category: "غذا", text: "غذایی که {X} هر هفته می‌خوره و خسته نمیشه" },
  { id: "food-13", category: "غذا", text: "اگه {X} آخرین وعده غذاییشو انتخاب کنه چی می‌خوره" },
  { id: "food-14", category: "غذا", text: "غذایی که {X} حاضره برای خوردنش یه ساعت رانندگی کنه" },
  { id: "food-15", category: "غذا", text: "چیزی که {X} وقتی مریضه دلش می‌خواد بخوره" },

  // فیلم/سریال
  { id: "movie-16", category: "فیلم/سریال", text: "فیلمی که {X} بارها دیده و هنوز خسته نشده" },
  { id: "movie-17", category: "فیلم/سریال", text: "سریالی که {X} یه شبه تموم کرده" },
  { id: "movie-18", category: "فیلم/سریال", text: "فیلمی که {X} به همه توصیه می‌کنه ببیننش" },
  { id: "movie-19", category: "فیلم/سریال", text: "فیلمی که {X} وقتی ناراحته میبینه حالش جا میاد" },
  { id: "movie-20", category: "فیلم/سریال", text: "آخرین فیلمی که {X} گریه‌اش انداخته" },
  { id: "movie-21", category: "فیلم/سریال", text: "فیلمی که {X} حاضره بارها ببینه و هر بار هم بخنده" },
  { id: "movie-22", category: "فیلم/سریال", text: "سریالی که {X} خوابشو به خاطرش به هم زده" },
  { id: "movie-23", category: "فیلم/سریال", text: "فیلمی که {X} فکر می‌کنه همه باید ببیننش" },
  { id: "movie-24", category: "فیلم/سریال", text: "فیلمی که {X} نقل‌قول‌هاشو حفظه" },
  { id: "movie-25", category: "فیلم/سریال", text: "اولین فیلمی که {X} اگه یه شب تنها باشه میبینه" },
  { id: "movie-26", category: "فیلم/سریال", text: "فیلمی که {X} با دیدن دوباره‌اش هنوزم هیجان‌زده میشه" },
  { id: "movie-27", category: "فیلم/سریال", text: "سریالی که {X} وقتی تموم شد دپرس شد" },
  { id: "movie-28", category: "فیلم/سریال", text: "فیلمی که {X} کاش می‌تونست حافظه‌شو پاک کنه و دوباره برای اولین بار ببینه" },
  { id: "movie-29", category: "فیلم/سریال", text: "فیلمی که {X} رفیقاشو مجبور کرده ببیننش" },
  { id: "movie-30", category: "فیلم/سریال", text: "آخرین چیزی که {X} توی سینما دیده و دوستش داشته" },

  // شهر
  { id: "city-31", category: "شهر", text: "شهری که {X} همیشه آرزو داشته بره" },
  { id: "city-32", category: "شهر", text: "جایی که {X} اگه فردا بلیط داشته باشه میره" },
  { id: "city-33", category: "شهر", text: "شهری که {X} دوست داره یه روز توش زندگی کنه" },
  { id: "city-34", category: "شهر", text: "مقصدی که {X} وقتی از کار خسته میشه بهش فکر می‌کنه" },
  { id: "city-35", category: "شهر", text: "شهری که {X} عکس‌هاشو نگاه می‌کنه و آه می‌کشه" },
  { id: "city-36", category: "شهر", text: "جایی که {X} دوست داره تولدشو اونجا جشن بگیره" },
  { id: "city-37", category: "شهر", text: "شهری که {X} حاضره همه پس‌اندازشو خرجش کنه" },
  { id: "city-38", category: "شهر", text: "اولین جایی که {X} اگه قرعه‌کشی ببره میره" },
  { id: "city-39", category: "شهر", text: "شهری که {X} توی خوابش هم می‌بینه" },
  { id: "city-40", category: "شهر", text: "جایی که {X} دوست داره یه روز بازنشسته بشه و اونجا زندگی کنه" },
  { id: "city-41", category: "شهر", text: "شهری که {X} از هر کسی که ازش برگشته حسادت می‌کنه" },
  { id: "city-42", category: "شهر", text: "مقصدی که {X} وقتی استرس داره بهش فکر می‌کنه" },
  { id: "city-43", category: "شهر", text: "شهری که {X} بیشتر از همه جا دوست داره عکس ازش داشته باشه" },
  { id: "city-44", category: "شهر", text: "جایی که {X} آرزو داره یه روز ببینه" },
  { id: "city-45", category: "شهر", text: "شهری که {X} اگه یه هفته مرخصی داشت میرفت" },

  // بهترین دوست
  { id: "friend-46", category: "بهترین دوست", text: "کسی که {X} اول از همه زنگ میزنه وقتی خوشحاله" },
  { id: "friend-47", category: "بهترین دوست", text: "اسم کسی که {X} وقتی مشکل داره اول بهش زنگ میزنه" },
  { id: "friend-48", category: "بهترین دوست", text: "کسی که {X} رازاشو فقط بهش میگه" },
  { id: "friend-49", category: "بهترین دوست", text: "نفری که {X} بدون هماهنگی سر می‌زنه بهش" },
  { id: "friend-50", category: "بهترین دوست", text: "کسی که {X} باهاش بیشترین خاطره رو داره" },
  { id: "friend-51", category: "بهترین دوست", text: "اسم کسی که {X} نصف شب باهاش حرف می‌زنه" },
  { id: "friend-52", category: "بهترین دوست", text: "نفری که {X} باهاش بیشترین پیام رد و بدل می‌کنه" },
  { id: "friend-53", category: "بهترین دوست", text: "کسی که {X} حاضره براش هر کاری بکنه" },
  { id: "friend-54", category: "بهترین دوست", text: "اسم کسی که {X} وقتی گم بشه بهش زنگ میزنه" },
  { id: "friend-55", category: "بهترین دوست", text: "نفری که {X} می‌دونه هر وقت زنگ بزنه جواب میده" },
  { id: "friend-56", category: "بهترین دوست", text: "کسی که {X} بدون اون احساس می‌کنه یه چیزی کمه" },
  { id: "friend-57", category: "بهترین دوست", text: "اسم کسی که {X} باهاش می‌تونه ساعت‌ها حرف بزنه" },
  { id: "friend-58", category: "بهترین دوست", text: "نفری که {X} وقتی یه خبر خوب داره اول بهش میگه" },
  { id: "friend-59", category: "بهترین دوست", text: "کسی که {X} فکر می‌کنه بیشتر از همه می‌فهمتش" },
  { id: "friend-60", category: "بهترین دوست", text: "اسم کسی که {X} دوست داره همیشه کنارش باشه" },

  // چیز عجیب
  { id: "weird-61", category: "چیز عجیب", text: "عجیب‌ترین عادتی که {X} داره" },
  { id: "weird-62", category: "چیز عجیب", text: "چیزی که {X} انجام میده و فکر می‌کنه کسی نمیدونه" },
  { id: "weird-63", category: "چیز عجیب", text: "کاری که {X} می‌کنه و خودشم می‌دونه عجیبه" },
  { id: "weird-64", category: "چیز عجیب", text: "چیزی که {X} از خودش لو داده و بقیه تعجب کردن" },
  { id: "weird-65", category: "چیز عجیب", text: "عادتی که {X} داره و سعی می‌کنه مخفی‌اش کنه" },
  { id: "weird-66", category: "چیز عجیب", text: "چیزی که {X} قبول کرده که انجام میده ولی دلیلشو نمیگه" },
  { id: "weird-67", category: "چیز عجیب", text: "کاری که {X} وقتی تنهاست انجام میده" },
  { id: "weird-68", category: "چیز عجیب", text: "عجیب‌ترین چیزی که {X} بهش اعتراف کرده" },
  { id: "weird-69", category: "چیز عجیب", text: "کاری که {X} انجام میده و اگه کسی بفهمه خجالت می‌کشه" },
  { id: "weird-70", category: "چیز عجیب", text: "عادت مخفیانه‌ای که {X} داره" },

  // ترکیبی
  { id: "combo-71", category: "ترکیبی", text: "غذایی که {X} دوست داره توی شهر مورد علاقه‌اش بخوره" },
  { id: "combo-72", category: "ترکیبی", text: "کسی که {X} دوست داره باهاش بره شهر مورد علاقه‌اش" },
  { id: "combo-73", category: "ترکیبی", text: "فیلمی که {X} دوست داره با بهترین دوستش ببینه" },
  { id: "combo-74", category: "ترکیبی", text: "چیزی که {X} وقتی داره فیلم مورد علاقه‌اش رو میبینه دوست داره بخوره" },
  { id: "combo-75", category: "ترکیبی", text: "جایی که {X} دوست داره با بهترین دوستش بره" },
  { id: "combo-76", category: "ترکیبی", text: "غذایی که {X} فکر می‌کنه توی شهر مورد علاقه‌اش بهتر از همه جاست" },
  { id: "combo-77", category: "ترکیبی", text: "کسی که {X} می‌خواد فیلم مورد علاقه‌اش رو بهش معرفی کنه" },
  { id: "combo-78", category: "ترکیبی", text: "چیزی که {X} توی شهر مورد علاقه‌اش حتماً می‌خوره" },
  { id: "combo-79", category: "ترکیبی", text: "کسی که {X} عادت عجیبش رو بهش گفته" },
  { id: "combo-80", category: "ترکیبی", text: "جایی که {X} آرزو داره با بهترین دوستش یه روز بره" },
  { id: "combo-81", category: "ترکیبی", text: "غذایی که {X} فکر می‌کنه بهترین دوستش هم عاشقشه" },
  { id: "combo-82", category: "ترکیبی", text: "فیلمی که {X} توی شهر مورد علاقه‌اش دیده" },
  { id: "combo-83", category: "ترکیبی", text: "کسی که {X} عادت عجیبش رو جلوش انجام داده" },
  { id: "combo-84", category: "ترکیبی", text: "جایی که {X} دوست داره با بهترین دوستش غذای مورد علاقه‌اش رو بخوره" },
  { id: "combo-85", category: "ترکیبی", text: "فیلمی که {X} دوست داره توی شهر مورد علاقه‌اش ببینه" },
  { id: "combo-86", category: "ترکیبی", text: "چیزی که {X} وقتی با بهترین دوستش میره بیرون سفارش میده" },
  { id: "combo-87", category: "ترکیبی", text: "جایی که {X} می‌خواد عادت عجیبش رو اونجا هم انجام بده" },
  { id: "combo-88", category: "ترکیبی", text: "کسی که {X} بیشتر از همه دلش میخواد غذای مورد علاقه‌اش رو بچشه" },
  { id: "combo-89", category: "ترکیبی", text: "فیلمی که {X} با بهترین دوستش دیده و هر دو عاشقش شدن" },
  { id: "combo-90", category: "ترکیبی", text: "جایی که {X} دوست داره عادت عجیبش رو اونجا انجام بده" },
  { id: "combo-91", category: "ترکیبی", text: "غذایی که {X} اگه بره شهر مورد علاقه‌اش حتماً سفارش میده" },
  { id: "combo-92", category: "ترکیبی", text: "کسی که {X} می‌خواد ببره شهر مورد علاقه‌اش" },
  { id: "combo-93", category: "ترکیبی", text: "فیلمی که {X} وقتی با بهترین دوستش میره سینما انتخاب می‌کنه" },
  { id: "combo-94", category: "ترکیبی", text: "چیزی که {X} توی شهر مورد علاقه‌اش دنبالش میگرده" },
  { id: "combo-95", category: "ترکیبی", text: "کسی که {X} فیلم مورد علاقه‌اش رو باهاش دیده" },
  { id: "combo-96", category: "ترکیبی", text: "غذایی که {X} دوست داره بهترین دوستش هم بچشه" },
  { id: "combo-97", category: "ترکیبی", text: "جایی که {X} می‌خواد عادت عجیبش رو اونجا انجام بده و کسی نبینه" },
  { id: "combo-98", category: "ترکیبی", text: "فیلمی که {X} وقتی با بهترین دوستش میره بیرون ازش حرف میزنه" },
  { id: "combo-99", category: "ترکیبی", text: "چیزی که {X} توی شهر مورد علاقه‌اش حتماً انجام میده" },
  { id: "combo-100", category: "ترکیبی", text: "کسی که {X} می‌خواد همه چیزشو باهاش شریک بشه" },
];

function pickOne<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function getTargetPlayers(players: Player[], currentPlayer: Player) {
  const others = players.filter(player => player.id !== currentPlayer.id);
  return others.length > 0 ? others : players;
}

export function createQuestion(args: {
  players: Player[];
  currentPlayer: Player;
  usedQuestionIds: string[];
}): Question {
  const targetPlayers = getTargetPlayers(args.players, args.currentPlayer);
  const candidates = questionPrompts.flatMap(prompt =>
    targetPlayers.map(targetPlayer => ({ prompt, targetPlayer })),
  );

  const unusedCandidates = candidates.filter(({ prompt, targetPlayer }) => {
    const id = `${prompt.id}:${targetPlayer.id}`;
    return !args.usedQuestionIds.includes(id);
  });

  const choice = pickOne(unusedCandidates.length > 0 ? unusedCandidates : candidates);

  return {
    id: `${choice.prompt.id}:${choice.targetPlayer.id}`,
    templateId: choice.prompt.id,
    targetPlayerId: choice.targetPlayer.id,
    text: choice.prompt.text.replaceAll("{X}", choice.targetPlayer.name),
    answer: `جواب توافقی گروه درباره ${choice.targetPlayer.name}`,
  };
}
