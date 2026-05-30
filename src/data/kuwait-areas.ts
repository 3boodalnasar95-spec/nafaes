// Kuwait Governorates and Areas Data
// Total: 6 governorates, 166 areas

export interface DeliveryArea {
  id: string;
  governorate_id: string;
  name_ar: string;
  delivery_fee: number;
  estimated_days: number;
}

export interface Governorate {
  id: string;
  name_ar: string;
  name_en: string;
}

// Governorates
export const governorates: Governorate[] = [
  { id: 'capital', name_ar: 'محافظة العاصمة', name_en: 'Capital Governorate' },
  { id: 'hawalli', name_ar: 'محافظة حولي', name_en: 'Hawalli Governorate' },
  { id: 'farwaniya', name_ar: 'محافظة الفروانية', name_en: 'Farwaniya Governorate' },
  { id: 'mubarak', name_ar: 'محافظة مبارك الكبير', name_en: 'Mubarak Al-Kabir Governorate' },
  { id: 'ahmadi', name_ar: 'محافظة الأحمدي', name_en: 'Ahmadi Governorate' },
  { id: 'jahra', name_ar: 'محافظة الجهراء', name_en: 'Jahra Governorate' },
];

// Complete Areas List - 166 areas
export const deliveryAreas: DeliveryArea[] = [
  // ========== Capital Governorate - 45 Areas ==========
  // Free delivery (2.000 د.ك)
  { id: 'kw-city', governorate_id: 'capital', name_ar: 'مدينة الكويت', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'sharq', governorate_id: 'capital', name_ar: 'شرق', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'qibla', governorate_id: 'capital', name_ar: 'القبلة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'murgab', governorate_id: 'capital', name_ar: 'المرقاب', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'dasman', governorate_id: 'capital', name_ar: 'دسمان', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'salhiya', governorate_id: 'capital', name_ar: 'الصالحية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'sawaber', governorate_id: 'capital', name_ar: 'الصوابر', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'watani', governorate_id: 'capital', name_ar: 'الوطنية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'bneid-al-qar', governorate_id: 'capital', name_ar: 'بنيد القار', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'dasma', governorate_id: 'capital', name_ar: 'الدسمة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'addiyeh', governorate_id: 'capital', name_ar: 'الدعية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'mansouriya', governorate_id: 'capital', name_ar: 'المنصورية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'abdullah-salam', governorate_id: 'capital', name_ar: 'ضاحية عبدالله السالم', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'nuzha', governorate_id: 'capital', name_ar: 'النزهة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'adaliya', governorate_id: 'capital', name_ar: 'العدلية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'khaldiya', governorate_id: 'capital', name_ar: 'الخالدية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'keifan', governorate_id: 'capital', name_ar: 'كيفان', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'shamiya', governorate_id: 'capital', name_ar: 'الشامية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'qadisiya', governorate_id: 'capital', name_ar: 'القادسية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'rawda', governorate_id: 'capital', name_ar: 'الروضة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'faiha', governorate_id: 'capital', name_ar: 'الفيحاء', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'qudra', governorate_id: 'capital', name_ar: 'قرطبة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'yarmouk', governorate_id: 'capital', name_ar: 'اليرموك', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'surra', governorate_id: 'capital', name_ar: 'السرة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'hadayat-al-sour', governorate_id: 'capital', name_ar: 'حدائق السور', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'shueikh', governorate_id: 'capital', name_ar: 'الشويخ', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'shueikh-residential', governorate_id: 'capital', name_ar: 'الشويخ السكنية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'shueikh-industrial', governorate_id: 'capital', name_ar: 'الشويخ الصناعية', delivery_fee: 2.000, estimated_days: 1 },
  // 2.500 د.ك
  { id: 'shuwaikh-port', governorate_id: 'capital', name_ar: 'ميناء الشويخ', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'sulaibikhat', governorate_id: 'capital', name_ar: 'الصليبخات', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'sulaibikhat-nw', governorate_id: 'capital', name_ar: 'شمال غرب الصليبيخات / الجون', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'nahda', governorate_id: 'capital', name_ar: 'النهضة', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'granada', governorate_id: 'capital', name_ar: 'غرناطة', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'doha', governorate_id: 'capital', name_ar: 'الدوحة', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'doha-port', governorate_id: 'capital', name_ar: 'ميناء الدوحة', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'qirwan', governorate_id: 'capital', name_ar: 'القيروان', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'qirwan-south', governorate_id: 'capital', name_ar: 'جنوب القيروان / سدرة', delivery_fee: 2.500, estimated_days: 1 },
  // 5.000 د.ك - Islands
  { id: 'failaka', governorate_id: 'capital', name_ar: 'جزيرة فيلكا', delivery_fee: 5.000, estimated_days: 2 },
  { id: 'kubr', governorate_id: 'capital', name_ar: 'جزيرة كبر', delivery_fee: 5.000, estimated_days: 2 },
  { id: 'awjah', governorate_id: 'capital', name_ar: 'جزيرة عوهة', delivery_fee: 5.000, estimated_days: 2 },
  { id: 'umm-al-maradim', governorate_id: 'capital', name_ar: 'جزيرة أم المرادم', delivery_fee: 5.000, estimated_days: 2 },
  { id: 'miskan', governorate_id: 'capital', name_ar: 'جزيرة مسكان', delivery_fee: 5.000, estimated_days: 2 },
  { id: 'garouh', governorate_id: 'capital', name_ar: 'جزيرة قاروه', delivery_fee: 5.000, estimated_days: 2 },
  { id: 'umm-al-naml', governorate_id: 'capital', name_ar: 'جزيرة أم النمل', delivery_fee: 5.000, estimated_days: 2 },
  { id: 'shuwaikh-island', governorate_id: 'capital', name_ar: 'جزيرة الشويخ / عكاز', delivery_fee: 5.000, estimated_days: 2 },

  // ========== Hawalli Governorate - 20 Areas ==========
  // All 2.000 د.ك
  { id: 'hawalli-city', governorate_id: 'hawalli', name_ar: 'حولي', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'nakhshala', governorate_id: 'hawalli', name_ar: 'النكرة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'hawalli-circle', governorate_id: 'hawalli', name_ar: 'ميدان حولي', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'salmiya', governorate_id: 'hawalli', name_ar: 'السالمية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'shaab', governorate_id: 'hawalli', name_ar: 'الشعب', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'shaab-marine', governorate_id: 'hawalli', name_ar: 'الشعب البحري', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'jaberiya', governorate_id: 'hawalli', name_ar: 'الجابرية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'rumithiyeh', governorate_id: 'hawalli', name_ar: 'الرميثية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'bida', governorate_id: 'hawalli', name_ar: 'البدع', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'bayan', governorate_id: 'hawalli', name_ar: 'بيان', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'mushref', governorate_id: 'hawalli', name_ar: 'مشرف', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'mubarak-west-mushref', governorate_id: 'hawalli', name_ar: 'ضاحية مبارك العبدالله / غرب مشرف', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'salwa', governorate_id: 'hawalli', name_ar: 'سلوى', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'anjefa', governorate_id: 'hawalli', name_ar: 'أنجفة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'salam', governorate_id: 'hawalli', name_ar: 'السلام', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'hatin', governorate_id: 'hawalli', name_ar: 'حطين', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'shuhada', governorate_id: 'hawalli', name_ar: 'الشهداء', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'sadeeq', governorate_id: 'hawalli', name_ar: 'الصديق', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'zahra', governorate_id: 'hawalli', name_ar: 'الزهراء', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'ministries-area', governorate_id: 'hawalli', name_ar: 'منطقة الوزارات', delivery_fee: 2.000, estimated_days: 1 },

  // ========== Farwaniya Governorate - 29 Areas ==========
  // 2.000 د.ك
  { id: 'farwaniya-city', governorate_id: 'farwaniya', name_ar: 'الفروانية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'khaitan', governorate_id: 'farwaniya', name_ar: 'خيطان', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'khaitan-new', governorate_id: 'farwaniya', name_ar: 'خيطان الجديدة', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'abraq-khitan', governorate_id: 'farwaniya', name_ar: 'أبرق خيطان', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'khaitan-south', governorate_id: 'farwaniya', name_ar: 'خيطان الجنوبي', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'andalus', governorate_id: 'farwaniya', name_ar: 'الأندلس', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'ashabija', governorate_id: 'farwaniya', name_ar: 'أشبيلية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'omariya', governorate_id: 'farwaniya', name_ar: 'العمرية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'rahab', governorate_id: 'farwaniya', name_ar: 'الرابية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'rihab', governorate_id: 'farwaniya', name_ar: 'الرحاب', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'fardous', governorate_id: 'farwaniya', name_ar: 'الفردوس', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'riggae', governorate_id: 'farwaniya', name_ar: 'الرقعي', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'rai', governorate_id: 'farwaniya', name_ar: 'الري', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'rai-industrial', governorate_id: 'farwaniya', name_ar: 'الري الصناعية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'dajeej', governorate_id: 'farwaniya', name_ar: 'الضجيج', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'ardiya', governorate_id: 'farwaniya', name_ar: 'العارضية', delivery_fee: 2.000, estimated_days: 1 },
  { id: 'ardiya-industrial', governorate_id: 'farwaniya', name_ar: 'العارضية الصناعية', delivery_fee: 2.000, estimated_days: 1 },
  // 2.500 د.ك
  { id: 'airport', governorate_id: 'farwaniya', name_ar: 'مطار الكويت الدولي', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'jleeb-shuyoukh', governorate_id: 'farwaniya', name_ar: 'جليب الشيوخ', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'abbasia', governorate_id: 'farwaniya', name_ar: 'العباسية', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'hassawi', governorate_id: 'farwaniya', name_ar: 'الحساوي', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'shaddadiya', governorate_id: 'farwaniya', name_ar: 'الشدادية', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'kuwait-university-sh', governorate_id: 'farwaniya', name_ar: 'جامعة الكويت - الشدادية', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'sabah-al-nasser', governorate_id: 'farwaniya', name_ar: 'ضاحية صباح الناصر', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'abdullah-al-mubarak', governorate_id: 'farwaniya', name_ar: 'ضاحية عبدالله المبارك', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'west-abdullah-mubarak', governorate_id: 'farwaniya', name_ar: 'غرب عبدالله المبارك / الريان', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'south-abdullah-mubarak', governorate_id: 'farwaniya', name_ar: 'جنوب عبدالله المبارك / السور', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'madinat-al-maskan', governorate_id: 'farwaniya', name_ar: 'مدينة المساكن / البيرق', delivery_fee: 2.500, estimated_days: 1 },

  // ========== Mubarak Al-Kabir Governorate - 14 Areas ==========
  // All 2.500 د.ك
  { id: 'mubarak-al-kabir', governorate_id: 'mubarak', name_ar: 'مبارك الكبير', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'sabah-al-salem', governorate_id: 'mubarak', name_ar: 'صباح السالم', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'adan', governorate_id: 'mubarak', name_ar: 'العدان', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'qours', governorate_id: 'mubarak', name_ar: 'القصور', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'qreen', governorate_id: 'mubarak', name_ar: 'القرين', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'mubarak-al-kabir-msela', governorate_id: 'mubarak', name_ar: 'المسيلة', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'funitees', governorate_id: 'mubarak', name_ar: 'الفنيطيس', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'abu-futaira', governorate_id: 'mubarak', name_ar: 'أبو فطيرة', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'abu-futaira-west', governorate_id: 'mubarak', name_ar: 'غرب أبو فطيرة الحرفية', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'abu-hasaniya', governorate_id: 'mubarak', name_ar: 'أبو الحصانية', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'masayel', governorate_id: 'mubarak', name_ar: 'المسايل', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'sobhan', governorate_id: 'mubarak', name_ar: 'صبحان', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'sobhan-industrial', governorate_id: 'mubarak', name_ar: 'صبحان الصناعية', delivery_fee: 2.500, estimated_days: 1 },
  { id: 'vista', governorate_id: 'mubarak', name_ar: 'ويستا', delivery_fee: 2.500, estimated_days: 1 },

  // ========== Ahmadi Governorate - 31 Areas ==========
  // 3.000 د.ك
  { id: 'ahmadi-city', governorate_id: 'ahmadi', name_ar: 'الأحمدي', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'fintas', governorate_id: 'ahmadi', name_ar: 'الفنطاس', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'ugaila', governorate_id: 'ahmadi', name_ar: 'العقيلة', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'mahboula', governorate_id: 'ahmadi', name_ar: 'المهبولة', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'abu-halifa', governorate_id: 'ahmadi', name_ar: 'أبو حليفة', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'mangaf', governorate_id: 'ahmadi', name_ar: 'المنقف', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'fahaheel', governorate_id: 'ahmadi', name_ar: 'الفحيحيل', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'sabahia', governorate_id: 'ahmadi', name_ar: 'الصباحية', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'raqqa', governorate_id: 'ahmadi', name_ar: 'الرقة', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'hada', governorate_id: 'ahmadi', name_ar: 'هدية', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'dhahr', governorate_id: 'ahmadi', name_ar: 'الظهر', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'jaber-al-ali', governorate_id: 'ahmadi', name_ar: 'ضاحية جابر العلي', delivery_fee: 3.000, estimated_days: 1 },
  { id: 'fahad-al-ahmad', governorate_id: 'ahmadi', name_ar: 'ضاحية فهد الأحمد', delivery_fee: 3.000, estimated_days: 1 },
  // 3.500 د.ك
  { id: 'sabah-al-salem-ahmadi', governorate_id: 'ahmadi', name_ar: 'ضاحية علي صباح السالم / أم الهيمان', delivery_fee: 3.500, estimated_days: 2 },
  { id: 'abdullah-port', governorate_id: 'ahmadi', name_ar: 'ميناء عبدالله', delivery_fee: 3.500, estimated_days: 2 },
  { id: 'shuaiba', governorate_id: 'ahmadi', name_ar: 'الشعيبة', delivery_fee: 3.500, estimated_days: 2 },
  // 4.000 د.ك
  { id: 'maqwa', governorate_id: 'ahmadi', name_ar: 'المقوع', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'wra', governorate_id: 'ahmadi', name_ar: 'واره', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'zour', governorate_id: 'ahmadi', name_ar: 'الزور', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'khairan', governorate_id: 'ahmadi', name_ar: 'الخيران', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'khairan-city', governorate_id: 'ahmadi', name_ar: 'مدينة الخيران', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'sabah-al-ahmad-city', governorate_id: 'ahmadi', name_ar: 'مدينة صباح الأحمد', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'sabah-al-ahmad-marina', governorate_id: 'ahmadi', name_ar: 'مدينة صباح الأحمد البحرية', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'sabah-al-ahmad-south', governorate_id: 'ahmadi', name_ar: 'جنوب صباح الأحمد / عريفجان', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'sabah-al-ahmad-east', governorate_id: 'ahmadi', name_ar: 'شرق صباح الأحمد / الاستقلال', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'bender', governorate_id: 'ahmadi', name_ar: 'بنيدر', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'jaliya', governorate_id: 'ahmadi', name_ar: 'الجلعة', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'dabbiya', governorate_id: 'ahmadi', name_ar: 'الضبيعية', delivery_fee: 4.000, estimated_days: 2 },
  // 5.000 د.ك
  { id: 'wafra', governorate_id: 'ahmadi', name_ar: 'الوفرة', delivery_fee: 5.000, estimated_days: 3 },
  { id: 'wafra-agricultural', governorate_id: 'ahmadi', name_ar: 'الوفرة الزراعية', delivery_fee: 5.000, estimated_days: 3 },
  { id: 'nuwaisib', governorate_id: 'ahmadi', name_ar: 'النويصيب', delivery_fee: 5.000, estimated_days: 3 },

  // ========== Jahra Governorate - 27 Areas ==========
  // 3.000 د.ك
  { id: 'jahra-city', governorate_id: 'jahra', name_ar: 'الجهراء', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'jahra-old', governorate_id: 'jahra', name_ar: 'الجهراء القديمة', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'jahra-new', governorate_id: 'jahra', name_ar: 'الجهراء الجديدة', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'saad-abdullah', governorate_id: 'jahra', name_ar: 'مدينة سعد العبدالله', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'neim', governorate_id: 'jahra', name_ar: 'النعيم', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'qasr', governorate_id: 'jahra', name_ar: 'القصر', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'wahah', governorate_id: 'jahra', name_ar: 'الواحة', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'taima', governorate_id: 'jahra', name_ar: 'تيماء', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'taima-east', governorate_id: 'jahra', name_ar: 'شرق تيماء', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'naseem', governorate_id: 'jahra', name_ar: 'النسيم', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'ain', governorate_id: 'jahra', name_ar: 'العيون', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'qaisariya', governorate_id: 'jahra', name_ar: 'القيصرية', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'sleeb', governorate_id: 'jahra', name_ar: 'الصليبية', delivery_fee: 3.000, estimated_days: 2 },
  { id: 'sleeb-industrial', governorate_id: 'jahra', name_ar: 'الصليبية الصناعية', delivery_fee: 3.000, estimated_days: 2 },
  // 3.500 د.ك
  { id: 'amghara', governorate_id: 'jahra', name_ar: 'أمغرة', delivery_fee: 3.500, estimated_days: 2 },
  { id: 'kabd', governorate_id: 'jahra', name_ar: 'كبد', delivery_fee: 3.500, estimated_days: 2 },
  // 4.000 د.ك
  { id: 'kazema', governorate_id: 'jahra', name_ar: 'كاظمة', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'matala', governorate_id: 'jahra', name_ar: 'المطالع', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'saad-south', governorate_id: 'jahra', name_ar: 'جنوب سعد العبدالله / رحية السكنية', delivery_fee: 4.000, estimated_days: 2 },
  { id: 'nawaf-al-ahmad', governorate_id: 'jahra', name_ar: 'مدينة نواف الأحمد', delivery_fee: 4.000, estimated_days: 2 },
  // 4.500 د.ك
  { id: 'harir', governorate_id: 'jahra', name_ar: 'مدينة الحرير', delivery_fee: 4.500, estimated_days: 3 },
  { id: 'subiya', governorate_id: 'jahra', name_ar: 'الصبية', delivery_fee: 4.500, estimated_days: 3 },
  { id: 'rawdatain', governorate_id: 'jahra', name_ar: 'الروضتين', delivery_fee: 4.500, estimated_days: 3 },
  // 5.000 د.ك
  { id: 'salmi', governorate_id: 'jahra', name_ar: 'السالمي', delivery_fee: 5.000, estimated_days: 3 },
  { id: 'abdali', governorate_id: 'jahra', name_ar: 'العبدلي', delivery_fee: 5.000, estimated_days: 3 },
  { id: 'bubyan', governorate_id: 'jahra', name_ar: 'جزيرة بوبيان', delivery_fee: 5.000, estimated_days: 4 },
  { id: 'warba', governorate_id: 'jahra', name_ar: 'جزيرة وربة', delivery_fee: 5.000, estimated_days: 4 },
];

// Helper functions
export function getGovernorates(): Governorate[] {
  return governorates;
}

export function getAreasByGovernorate(governorateId: string): DeliveryArea[] {
  return deliveryAreas.filter(area => area.governorate_id === governorateId);
}

export function getAreaById(areaId: string): DeliveryArea | undefined {
  return deliveryAreas.find(area => area.id === areaId);
}

export function getAllAreas(): DeliveryArea[] {
  return deliveryAreas;
}

export function searchAreas(query: string, governorateId?: string): DeliveryArea[] {
  let results = deliveryAreas;
  
  if (governorateId) {
    results = results.filter(area => area.governorate_id === governorateId);
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(area => 
      area.name_ar.toLowerCase().includes(lowerQuery)
    );
  }
  
  return results;
}

export function formatDeliveryFee(fee: number): string {
  return `${fee.toFixed(3)} د.ك`;
}

// Total count
export const TOTAL_AREAS = deliveryAreas.length;
export const TOTAL_GOVERNORATES = governorates.length;