$(function () {
    $('.faq-q').attr('aria-expanded', 'false').on('click', function () {
        var $question = $(this);
        var $icon = $question.find('span');
        var opening = $question.next('.faq-a').is(':hidden');

        $question.next('.faq-a').slideToggle(250);
        $icon.text(opening ? '\u2212' : '+');
        $question.attr('aria-expanded', String(opening));
    });
});
