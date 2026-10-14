document.getElementById('clearLocal').addEventListener('click', () => {
  try {
    ['scarlLang','scarlSelection'].forEach(key => localStorage.removeItem(key));
    sessionStorage.removeItem('scarlAgeAcknowledgedV1');
    document.getElementById('clearStatus').textContent = 'Vos préférences, votre sélection et la confirmation d’accès ont été effacées sur cet appareil. Les messages déjà envoyés ne sont pas supprimés.';
  } catch { document.getElementById('clearStatus').textContent = 'Le navigateur bloque cette opération. Effacez les données du site dans ses paramètres.'; }
});
document.getElementById('printWithdrawal').addEventListener('click', () => window.print());
document.getElementById('resetWithdrawal').addEventListener('click', () => document.querySelectorAll('#withdrawal input, #withdrawal textarea').forEach(field => field.value = ''));
