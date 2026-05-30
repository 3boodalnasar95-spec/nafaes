import { KuwaitArea, Governorate } from './types';

export const kuwaitGovernorates: Governorate[] = [
  { id: 'capital', name: 'العاصمة' },
  { id: 'hawalli', name: 'حولي' },
  { id: 'farwaniya', name: 'الفروانية' },
  { id: 'mubarak', name: 'مبارك الكبير' },
  { id: 'ahmadi', name: 'الأحمدي' },
  { id: 'jahra', name: 'الجهراء' },
];

export const kuwaitAreas: KuwaitArea[] = [
  // محافظة العاصمة
  { id: 'city', governorate: 'capital', name: 'مدينة الكويت', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sharq', governorate: 'capital', name: 'شرق', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qibla', governorate: 'capital', name: 'القبلة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'murgab', governorate: 'capital', name: 'المرقاب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'dasman', governorate: 'capital', name: 'دسمان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salhiya', governorate: 'capital', name: 'الصالحية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sawaber', governorate: 'capital', name: 'الصوابر', deliveryFee: 2, estimatedDays: 1 },
  { id: 'dasma', governorate: 'capital', name: 'الدسمة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'addiyeh', governorate: 'capital', name: 'الدعية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mansouriya', governorate: 'capital', name: 'المنصورية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'nuzha', governorate: 'capital', name: 'النزهة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'adaliya', governorate: 'capital', name: 'العدلية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'khaldiya', governorate: 'capital', name: 'الخالدية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'keifan', governorate: 'capital', name: 'كيفان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'shamiya', governorate: 'capital', name: 'الشامية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qadisiya', governorate: 'capital', name: 'القادسية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rawda', governorate: 'capital', name: 'الروضة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'faiha', governorate: 'capital', name: 'الفيحاء', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qudra', governorate: 'capital', name: 'قرطبة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'yarmouk', governorate: 'capital', name: 'اليرموك', deliveryFee: 2, estimatedDays: 1 },
  { id: 'surra', governorate: 'capital', name: 'السرة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sulaibikhat', governorate: 'capital', name: 'الصليبيخات', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'nahda', governorate: 'capital', name: 'النهضة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'granada', governorate: 'capital', name: 'غرناطة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'doha', governorate: 'capital', name: 'الدوحة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'bnied-al-qar', governorate: 'capital', name: 'بنيد القار', deliveryFee: 2, estimatedDays: 1 },

  // محافظة حولي
  { id: 'hawalli-city', governorate: 'hawalli', name: 'حولي', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salmiya', governorate: 'hawalli', name: 'السالمية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jabriya', governorate: 'hawalli', name: 'الجابرية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rumithiyeh', governorate: 'hawalli', name: 'الرميثية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'bida', governorate: 'hawalli', name: 'البدع', deliveryFee: 2, estimatedDays: 1 },
  { id: 'bayan', governorate: 'hawalli', name: 'بيان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mushref', governorate: 'hawalli', name: 'مشرف', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salwa', governorate: 'hawalli', name: 'سلوى', deliveryFee: 2, estimatedDays: 1 },
  { id: 'shaab', governorate: 'hawalli', name: 'الشعب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salam', governorate: 'hawalli', name: 'السلام', deliveryFee: 2, estimatedDays: 1 },
  { id: 'hatin', governorate: 'hawalli', name: 'حطين', deliveryFee: 2, estimatedDays: 1 },
  { id: 'shuhada', governorate: 'hawalli', name: 'الشهداء', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sadeeq', governorate: 'hawalli', name: 'الصديق', deliveryFee: 2, estimatedDays: 1 },
  { id: 'zahra', governorate: 'hawalli', name: 'الزهراء', deliveryFee: 2, estimatedDays: 1 },

  // محافظة الفروانية
  { id: 'farwaniya-city', governorate: 'farwaniya', name: 'الفروانية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'khaitan', governorate: 'farwaniya', name: 'خيطان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'abraq-khitan', governorate: 'farwaniya', name: 'أبرق خيطان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'andalus', governorate: 'farwaniya', name: 'الأندلس', deliveryFee: 2, estimatedDays: 1 },
  { id: 'ashabija', governorate: 'farwaniya', name: 'أشبيلية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'omariya', governorate: 'farwaniya', name: 'العمرية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rahab', governorate: 'farwaniya', name: 'الرابية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rihab', governorate: 'farwaniya', name: 'الرحاب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'fardous', governorate: 'farwaniya', name: 'الفردوس', deliveryFee: 2, estimatedDays: 1 },
  { id: 'riggae', governorate: 'farwaniya', name: 'الرقعي', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jleeb-shuyoukh', governorate: 'farwaniya', name: 'جليب الشيوخ', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'sabah-al-nasser', governorate: 'farwaniya', name: 'ضاحية صباح الناصر', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'abdullah-al-mubarak', governorate: 'farwaniya', name: 'ضاحية عبدالله المبارك', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'ardiya', governorate: 'farwaniya', name: 'العارضية', deliveryFee: 2.5, estimatedDays: 1 },

  // محافظة مبارك الكبير
  { id: 'sabah-al-salem-mubarak', governorate: 'mubarak', name: 'صباح السالم', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'adan', governorate: 'mubarak', name: 'العدان', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'qours', governorate: 'mubarak', name: 'القصور', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'mubarak-city', governorate: 'mubarak', name: 'مبارك الكبير', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'funitees', governorate: 'mubarak', name: 'الفنيطيس', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'abu-futaira', governorate: 'mubarak', name: 'أبو فطيرة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'masayel', governorate: 'mubarak', name: 'المسايل', deliveryFee: 3, estimatedDays: 2 },
  { id: 'sobhan', governorate: 'mubarak', name: 'صبحان', deliveryFee: 3, estimatedDays: 2 },

  // محافظة الأحمدي
  { id: 'ahmadi-city', governorate: 'ahmadi', name: 'الأحمدي', deliveryFee: 3, estimatedDays: 2 },
  { id: 'fintas', governorate: 'ahmadi', name: 'الفنطاس', deliveryFee: 3, estimatedDays: 1 },
  { id: 'mahboula', governorate: 'ahmadi', name: 'المهبولة', deliveryFee: 3, estimatedDays: 1 },
  { id: 'abu-halifa', governorate: 'ahmadi', name: 'أبو حليفة', deliveryFee: 3, estimatedDays: 1 },
  { id: 'mangaf', governorate: 'ahmadi', name: 'المنقف', deliveryFee: 3, estimatedDays: 1 },
  { id: 'fahaheel', governorate: 'ahmadi', name: 'الفحيحيل', deliveryFee: 3, estimatedDays: 1 },
  { id: 'sabahia', governorate: 'ahmadi', name: 'الصباحية', deliveryFee: 3, estimatedDays: 1 },
  { id: 'ugaila', governorate: 'ahmadi', name: 'العقيلة', deliveryFee: 3, estimatedDays: 1 },
  { id: 'wafra', governorate: 'ahmadi', name: 'الوفرة', deliveryFee: 4, estimatedDays: 2 },
  { id: 'jaber-al-ali', governorate: 'ahmadi', name: 'ضاحية جابر العلي', deliveryFee: 3, estimatedDays: 1 },
  { id: 'fahad-al-ahmad', governorate: 'ahmadi', name: 'ضاحية فهد الأحمد', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'sabah-al-ahmad-city', governorate: 'ahmadi', name: 'مدينة صباح الأحمد', deliveryFee: 4, estimatedDays: 2 },
  { id: 'khairan', governorate: 'ahmadi', name: 'الخيران', deliveryFee: 4, estimatedDays: 2 },

  // محافظة الجهراء
  { id: 'jahra-city', governorate: 'jahra', name: 'الجهراء', deliveryFee: 3, estimatedDays: 2 },
  { id: 'jahra-old', governorate: 'jahra', name: 'الجهراء القديمة', deliveryFee: 3, estimatedDays: 2 },
  { id: 'saad-abdullah', governorate: 'jahra', name: 'مدينة سعد العبدالله', deliveryFee: 3, estimatedDays: 2 },
  { id: 'neim', governorate: 'jahra', name: 'النعيم', deliveryFee: 3, estimatedDays: 2 },
  { id: 'qasr', governorate: 'jahra', name: 'القصر', deliveryFee: 3, estimatedDays: 2 },
  { id: 'wahah', governorate: 'jahra', name: 'الواحة', deliveryFee: 3, estimatedDays: 2 },
  { id: 'taima', governorate: 'jahra', name: 'تيماء', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'naseem', governorate: 'jahra', name: 'النسيم', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'ain', governorate: 'jahra', name: 'العيون', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'sleeb', governorate: 'jahra', name: 'الصليبية', deliveryFee: 4, estimatedDays: 2 },
  { id: 'amghara', governorate: 'jahra', name: 'أمغرة', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'kabd', governorate: 'jahra', name: 'كبد', deliveryFee: 4, estimatedDays: 2 },
  { id: 'nawaf-al-ahmad', governorate: 'jahra', name: 'مدينة نواف الأحمد', deliveryFee: 4, estimatedDays: 2 },
];

export function getAreasByGovernorate(governorateId: string): KuwaitArea[] {
  return kuwaitAreas.filter(area => area.governorate === governorateId);
}

export function getAreaById(areaId: string): KuwaitArea | undefined {
  return kuwaitAreas.find(area => area.id === areaId);
}