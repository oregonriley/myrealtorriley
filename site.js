const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
}

document.querySelectorAll('.capture-form').forEach((form) => {
  const source = form.querySelector('input[name="source_page"]');
  if (source) source.value = window.location.pathname;

  form.addEventListener('submit', (event) => {
    const email = form.querySelector('input[name="email"]');
    const phone = form.querySelector('input[name="phone"]');
    if (email && phone && !email.value.trim() && !phone.value.trim()) {
      event.preventDefault();
      phone.setCustomValidity('Please add a phone number or email address.');
      phone.reportValidity();
      return;
    }
    if (phone) phone.setCustomValidity('');
  });
});
