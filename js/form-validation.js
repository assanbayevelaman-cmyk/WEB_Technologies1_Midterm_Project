(function ($) {
    'use strict';
    if (!$) return;

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

    function strength(password) {
        const checks = {
            length: password.length >= 8,
            mixed: /[a-z]/.test(password) && /[A-Z]/.test(password),
            number: /\d/.test(password),
            symbol: /[^A-Za-z0-9\s]/.test(password)
        };
        const score = Object.values(checks).filter(Boolean).length;
        return { checks, level: password.length < 8 || score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong' };
    }

    function errorFor($field, $form) {
        const value = $.trim($field.val() || '');
        switch ($field.data('rule')) {
            case 'name': return !value ? 'Please enter your name.' : value.length < 2 ? 'Name must contain at least 2 characters.' : '';
            case 'email': return !value ? 'Please enter your email.' : !emailPattern.test(value) || value.includes('..') ? 'Enter a valid email address.' : '';
            case 'message': return !value ? 'Please enter a message.' : value.length < 10 ? 'Message must contain at least 10 characters.' : '';
            case 'password': return !value ? 'Please create a password.' : value.length < 8 ? 'Use at least 8 characters.' : strength(value).level === 'weak' ? 'Add a number, mixed case, or symbol to strengthen it.' : '';
            case 'confirm': return !value ? 'Please confirm your password.' : value !== $form.find('[data-rule="password"]').val() ? 'Passwords do not match.' : '';
            default: return '';
        }
    }

    function validate($field, reveal) {
        const $form = $field.closest('form');
        const error = errorFor($field, $form);
        const $message = $field.closest('.mb-3').find('.field-msg').first();
        if (reveal) {
            $field.toggleClass('is-invalid', !!error).toggleClass('is-valid', !error);
            $message.toggleClass('text-danger', !!error).toggleClass('text-success', !error)
                .text(error || 'Looks good.');
        }
        return !error;
    }

    function updateStrength($form) {
        const password = $form.find('[data-rule="password"]').val() || '';
        const result = strength(password);
        const $meter = $form.find('.pw-meter');
        $meter.attr('data-level', password ? result.level : 'empty');
        $meter.find('.pw-meter-fill').css('width', !password ? '0' : result.level === 'weak' ? '33%' : result.level === 'medium' ? '66%' : '100%');
        $form.find('.pw-label-text').text(password ? result.level[0].toUpperCase() + result.level.slice(1) : 'Not entered');
        $form.find('[data-check]').each(function () {
            const met = !!password && result.checks[$(this).data('check')];
            $(this).toggleClass('met', met).find('i').attr('class', met ? 'bi bi-check-circle-fill' : 'bi bi-circle');
        });
    }

    $(function () {
        const $forms = $('form[data-validate]');
        $forms.on('input change', '[data-rule]', function () {
            const $field = $(this), $form = $field.closest('form');
            if ($field.is('[data-rule="password"]')) {
                updateStrength($form);
                const $confirm = $form.find('[data-rule="confirm"]');
                if ($confirm.val()) validate($confirm, true);
            }
            if ($field.data('touched') || $field.val() || $field.is(':checkbox')) {
                $field.data('touched', true);
                validate($field, true);
            }
        });
        $forms.on('blur', '[data-rule]', function () {
            $(this).data('touched', true);
            validate($(this), true);
        });
        $forms.on('click', '.toggle-pw', function () {
            const $input = $($(this).data('target'));
            const show = $input.attr('type') === 'password';
            $input.attr('type', show ? 'text' : 'password');
            $(this).attr('aria-label', show ? 'Hide password' : 'Show password')
                .find('i').attr('class', show ? 'bi bi-eye-slash' : 'bi bi-eye');
        });
        $forms.on('submit', function (event) {
            event.preventDefault();
            const $form = $(this), invalid = [];
            $form.find('[data-rule]').each(function () {
                $(this).data('touched', true);
                if (!validate($(this), true)) invalid.push(this);
            });
            const $alert = $form.find('.form-alert').empty();
            if (invalid.length) {
                $('<div class="alert alert-danger" role="alert">Please correct the highlighted fields before continuing.</div>').appendTo($alert);
                invalid[0].focus();
                return;
            }
            const registering = $form.find('[data-rule="password"]').length > 0;
            const name = $('<span>').text($.trim($form.find('[data-rule="name"]').val())).html();
            $('<div class="alert alert-success" role="status"></div>').text(registering ? `Welcome, ${name}! Your registration is valid.` : `Thank you, ${name}! Your message is ready.`).appendTo($alert);
            $form[0].reset();
            $form.find('[data-rule]').removeClass('is-valid is-invalid').removeData('touched');
            $form.find('.field-msg').empty().removeClass('text-danger text-success');
            updateStrength($form);
        });
    });
})(window.jQuery);
