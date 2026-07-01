package com.pauloney.Newsletter.services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public MailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void enviarNewsletter(String emailDestino, String nomeUsuario) {
        try {
            Context context = new Context();
            context.setVariable("nome", nomeUsuario);
            context.setVariable("linkAcesso", "http://localhost:3000");

            String html = templateEngine.process("email/newsletter", context);

            MimeMessage mensagem = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    mensagem,
                    true,
                    "UTF-8"
            );

            helper.setTo(emailDestino);
            helper.setSubject("Seu plano de transformação começou");
            helper.setText(html, true);

            mailSender.send(mensagem);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar newsletter", e);
        }
    }

}
