const { forgot_pass_template, order_confirmation_template, message_notification_template, tracking_number_template } = require("../util/templates");
const bcryptjs = require('bcryptjs');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//Enviar mensajes para Resetear Password
const sendMailToResetPass = async (req, res) => {
  try {
    // const email = req.body.email;
    // const [exist] = await getInfluencerByEmail(email);
    // console.log(exist);

    // if (exist.length == 0) {
    //   return res.status(404).json({
    //     msg: "Email not registered."
    //   });
    // }

    // const newPass = passGenerator()
    // const newPassEncoded = bcryptjs.hashSync(newPass, 10);
    // const updateResult = await updateInfluencerModel({ password: newPassEncoded }, exist[0].id);

    // if (!updateResult) {
    //   return res.status(500).json({
    //     msg: "Failed to update password."
    //   });
    // }

    // const msg = {
    //   to: email, // Change to your recipient
    //   from: 'support@pistonsfuelpower.com', // Change to your verified sender
    //   subject: 'Password reseted',
    //   text: 'Thank you very much for being part of this project',
    //   html: forgot_pass_template(newPass),
    // }

    // await sgMail.send(msg);

    // // Responder después de que se haya enviado el correo
    // res.send({
    //   msg: 'Email sent successfully'
    // });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.message
    });
  }
}

//Enviar mensajes para Confirmar Orden de Compra
const sendMailorderConfirmation = async (req, res) => {
  try {
    const { fullOrder, email } = req.body;

    const htmlRows = fullOrder.product.map( (prod) => {
      return `<tr>
              <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
               <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                 <tr>
                  <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                     <tr>
                      <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:70px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="${prod.images[0].img_url}" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="70"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                  <td style="padding:0;Margin:0;width:20px"></td>
                  <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;width:265px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>${prod.title}</strong></p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                  <td style="padding:0;Margin:0;width:20px"></td>
                  <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;width:80px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${prod.quantity} pcs</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                  <td style="padding:0;Margin:0;width:20px"></td>
                  <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;width:85px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="right" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">$ ${prod.price}</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             `;
    });

    const htmlString = htmlRows.join('');

    const msg = {
      to: email, // Change to your recipient
      from: 'support@pistonsfuelpower.com', // Change to your verified sender
      subject: 'Order Confirmation',
      text: 'Thank you for choosing us, enjoy your purchase',
      html: order_confirmation_template(fullOrder, htmlString),
    }

    await sgMail.send(msg);

    // Responder después de que se haya enviado el correo
    res.send({
      msg: 'Email sent successfully'
    });

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

//Enviar mensajes notificando informacion de Shipping
const sendTrackingNumberNotification = async (req, res) => {
  try {
    const { email, orderId, carrier, trackingNumber, url } = req.body;

    const msg = {
      to: email, // Change to your recipient
      from: 'support@pistonsfuelpower.com', // Change to your verified sender
      subject: 'Your order has been assigned a shipping',
      text: 'Hello dear customer, your order has already been assigned a shipping which you can track by clicking on the button below.',
      html: tracking_number_template(orderId, carrier, trackingNumber, url),
    }

    await sgMail.send(msg);

    // Responder después de que se haya enviado el correo
    res.send({
      msg: 'Email sent successfully'
    });

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

//Enviar correo sobre nuevo mensaje recibido
const sendNewMessageNotification = async (req, res) => {
  try {
    const { fullname, phone, email, message } = req.body;

    const msg = {
      to: ['yosuani@d2america.com'], // Change to your recipient
      from: 'support@pistonsfuelpower.com', // Change to your verified sender
      subject: 'New message recived',
      text: 'Hello, we have received a new message',
      html: message_notification_template(fullname, phone, email, message),
    }

    await sgMail.send(msg);

    // Responder después de que se haya enviado el correo
    res.send({
      msg: 'Email sent successfully'
    });

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
}

module.exports = {
  sendMailToResetPass,
  sendMailorderConfirmation,
  sendTrackingNumberNotification,
  sendNewMessageNotification
}