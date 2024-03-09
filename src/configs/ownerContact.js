const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Babu Perumana\n' // full name
            + 'ORG:Kaipully Temple;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=918907959595:+91 89 0795-9595\n' // WhatsApp ID + phone number
            + 'END:VCARD'

module.exports = vcard
