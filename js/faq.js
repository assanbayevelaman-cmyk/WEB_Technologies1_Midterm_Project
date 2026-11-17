$('.faq-q').click(function() {
    $(this).next('.faq-a').slideToggle(200);
    $(this).find('span').text($(this).find('span').text() === '+' ? '-' : '+');
})