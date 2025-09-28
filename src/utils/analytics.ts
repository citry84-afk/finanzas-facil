// Google Analytics utilities
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-633RQLC6T0', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Eventos específicos para nuestra aplicación
export const analyticsEvents = {
  // Calculadora de Millonario
  millionaireCalculatorOpened: () => trackEvent('calculator_opened', 'millionaire_calculator'),
  millionaireCalculationCompleted: (age: number, monthlySavings: number) => 
    trackEvent('calculation_completed', 'millionaire_calculator', `age_${age}_savings_${monthlySavings}`),
  
  // Calculadora de Salario
  salaryCalculatorOpened: () => trackEvent('calculator_opened', 'salary_calculator'),
  salaryCalculationCompleted: (grossSalary: number, region: string) => 
    trackEvent('calculation_completed', 'salary_calculator', `gross_${grossSalary}_region_${region}`),
  
  // Control de Gastos
  expenseControlOpened: () => trackEvent('app_opened', 'expense_control'),
  userRegistered: () => trackEvent('user_registered', 'expense_control'),
  expenseAdded: (amount: number, category: string) => 
    trackEvent('expense_added', 'expense_control', category, amount),
  incomeAdded: (amount: number, source: string) => 
    trackEvent('income_added', 'expense_control', source, amount),
  quizCompleted: (score: number) => 
    trackEvent('quiz_completed', 'expense_control', `score_${score}`),
  
  // Navegación
  navigationToExpenseControl: () => trackEvent('navigation', 'app_flow', 'to_expense_control'),
  navigationToCalculator: (calculatorType: string) => 
    trackEvent('navigation', 'app_flow', `to_${calculatorType}`),
  
  // Engagement
  timeSpentOnPage: (page: string, seconds: number) => 
    trackEvent('time_spent', 'engagement', page, seconds),
  featureUsed: (feature: string) => trackEvent('feature_used', 'engagement', feature),
};




