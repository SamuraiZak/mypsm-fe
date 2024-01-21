const tabIndentDefault = '&emsp;&emsp;';
const tabIndentSmall = '&emsp;';
const tabIndentBig = '&emsp;&emsp;&emsp;&emsp;';

export const mockLetterTemplates: IntLetterTemplate[] = [
    {
        id: 'Surat Tawaran Pemangkuan',
        receiverReference: tabIndentSmall + '-',
        senderReference: 'LKIM:PSM(S)406/533/3',
        letterDate: tabIndentSmall + '3 Februari 2022',
        receiverNameAddress:
            'Encik Mohamad Rizal Bin Sahari (01755)<br>Pegawai Ehwal Ekonomi Gred E52 <br>Pejabat LKIM Negeri Perak <br>LKIM Negeri Perak<br><b>32040 SERI MANJUNG, PERAK</b><br><br>',
        receiverTitle: 'Tuan/Puan,<br>',
        letterSubject:
            '<br><b>URUSAN PEMANGKUAN KE JAWATAN SETIAUSAHA PEJABAT GRED N32</b><br><br>',
        letterBody:
            'Dengan segala hormatnya saya merujuk kepada perkara yang tersebut di atas dan sukacita dimaklumkan bahawa Mesyuarat Jawatankuasa Kenaikan Pangkat Kumpulan Sokongan LKIM (Gred 1 hingga 40) Bil. 2/2022 yang telah diadakan pada 24 Disember 2022 telah meluluskan <b>Pemangkuan Jawatan Setiausaha Pejabat Gred N32</b> kepada tuan/puan.<br><br>' +
            '2.' +
            tabIndentDefault +
            'Tarikh Pemangkuan Jawatan Setiausaha Pejabat Gred N32 ini berkuatkuasa mulai <b>17 Januari 2022 atau pada tarikh tuan/puan melapor diri untuk bertugas</b>. Penempatan tuan/puan adalah ditetapkan di <b>Pejabat A</b>. <br><br>' +
            '3. ' +
            tabIndentDefault +
            'Sehubungan dengan ini tuan/puan adalah diminta melaporkan diri kepada:-<br><br>' + 
            tabIndentBig +
            'Ketua Pengarah<br>' +
            tabIndentBig +
            'Lembaga Kemajuan Ikan Malaysia<br>' +
            tabIndentBig +
            'Aras 5, Pejabat Ketua Pengarah<br>' +
            tabIndentBig +
            'Wisma LKIM, Jalan Desaria, Pulau Meranti<br>' +
            tabIndentBig +
            '<b>47210 PUCHONG, SELANGOR</b><br><br>' +
            '4.' +
            tabIndentDefault +
            'Tuan/puan dikehendaki menyediakan Nota Penyerahan Tugas seperti borang yang dilampirkan kepada Pegawai Pengganti, Pegawai Penyelia dan salinan kepada Seksyen Pengurusan Sumber Manusia, Bahagian Khidmat Pengurusan untuk tujuan rekod.<br><br>' +
            '5' +
            tabIndentDefault +
            'Tawaran ini akan terbatal sekiranya tidak ada maklumbalas daripada pihak tuan/puan dalam <b>tempoh tujuh (7) hari daripada tarikh surat ini.</b><br><br>' +
            'Sekian, terima kasih.<br><br>' +
            "<b>'WAWASAN KEMAKMURAN BERSAMA 2030'</b><br><br>" +
            "<b>'BERKHIDMAT UNTUK NEGARA'<br><br></b>",
        letterFooter:
            'Saya yang menjalankan amanah,<br><br><br>' +
            '<b>(YUSOFF BIN OTHMAN)</b><br>' +
            'Pengerusi<br>' +
            'Jawatankuasa Kenaikan Pangkat<br>' +
            'Kumpulan Sokongan (Gred 1 hingga 40)<br>' +
            'Lembaga Kemajuan Ikan Malaysia<br>' +
            's.k.<br>' + 'TKP (M)<br>' + 'P (KP)<br>' + 'KS (PSM)<br>' + 'PPEE (PSM) 1<br>' + 'PmEE (PSM) 2<br>' + 'Fail Peribadi',
    },
    {
        id: 'Surat Penangguhan Rayuan',
        receiverReference: tabIndentSmall + '-',
        senderReference: 'LKIM:PSM.406/776/1 Jld.',
        letterDate: tabIndentSmall + '3 Februari 2022',
        receiverNameAddress:
            'Encik Mohamad Rizal Bin Sahari (01755)<br>Pegawai Ehwal Ekonomi Gred E52 <br>Pejabat LKIM Negeri Perak <br>LKIM Negeri Perak<br><b>32040 SERI MANJUNG, PERAK</b><br><br>',
        receiverTitle: 'Tuan/Puan,<br>',
        letterSubject:
            '<br><b>PENANGGUHAN PERTUKARAN PEGAWAI LKIM BIL. 1 TAHUN 2022</b><br><br>',
        letterBody:
            'Dengan segala hormatnya surat tuan/puan bertarikh 1 Mac 2022 adalah berkaitan.<br><br>' +
            '2.' +
            tabIndentDefault +
            'Adalah dimaklumkan bahawa pihak Pengurusan LKIM meluluskan permohonan tuan untuk menangguhkan pertukaran sehingga 31 Mac 2022. Sehubungan dengan ini, tuan perlu melaporkan diri bertugas ke Pejabat LKIM Negeri Perlis pada <b>1 April 2022.</b><br><br>' +
            
            'Sekian, terima kasih.<br><br><br>' +
            '<b>"WAWASAN KEMAKMURAN BERSAMA 2030"</b><br><br>' +
            '<b>"BERKHIDMAT UNTUK NEGARA"<br><br></b>',
        letterFooter:
            'Saya yang menjalankan amanah,<br><br><br>' +
            '<b>(KHAIRONNESAK BINTI OMAR)</b><br>' +
            'Timbalan Ketua Pengarah (Pengurusan)<br>' +
            'Lembaga Kemajuan Ikan Malaysia<br>' +
            'b.p Ketua Pengarah LKIM<br><br>'+
            'PERTUKARAN PEGAWAI LKIM BIL. 1 TAHUN 2022<br>' +
            'LKIM:PSM.406/776/2 Jld. <br>'  + 
            '9 MAC 2022<br><br>' +
            's.k.<br>' +
            '1.' + tabIndentSmall + 'P(A)<br>' +
            '2.' + tabIndentSmall +
            'Pengarah<br>' + tabIndentDefault +
            'Pejabat LKIM Negeri Perlis<br>' + tabIndentDefault +
            'Kompleks Perikanan LKIM Kg. Perak<br>' + tabIndentDefault +
            '<b>02000 KUALA PERLIS, PERLIS</b><br>' + 
            '3.' + tabIndentSmall + 'P (KP)<br>' +
            '4.' + tabIndentSmall + 'P (W)<br>' +
            '5.' + tabIndentSmall + 'KPT (PSM) 3<br>'+
            '6.' + tabIndentSmall + 'PmEE (PSM) 2<br>' +
            '7.' + tabIndentSmall + 'Fail Peribadi<br>'
    },
    {
        id: 'Surat Arahan Tanggung Kerja',
        receiverReference: tabIndentSmall + '-',
        senderReference: 'LKIM:PSM.406/969',
        letterDate: tabIndentSmall + '3 Februari 2022',
        receiverNameAddress:
            'Encik Mohamad Rizal Bin Sahari (01755)<br>Pegawai Ehwal Ekonomi Gred E52 <br>Pejabat LKIM Negeri Perak <br>LKIM Negeri Perak<br><b>32040 SERI MANJUNG, PERAK</b><br><br>',
        receiverTitle: 'Tuan/Puan,<br>',
        letterSubject:
            '<br><b>ARAHAN PENANGGUNGAN KERJA JAWATAN ............... DI ...............</b><br><br>',
        letterBody:
            'Dengan hormatnya saya merujuk kepada perkara tersebut di atas.<br><br>' +
            '2.' +
            tabIndentDefault +
            'Dimaklumkan bahawa tuan/puan dengan ini diarah menanggung kerja: <br><br>' +
            tabIndentBig +
            '(a)' + tabIndentDefault + 'Jawatan:.................<br>' +
            tabIndentBig +
            '(b)' + tabIndentDefault + 'Bermula:......<b>tarikh</b>.......sehingga.......<b>tarikh</b>........<br><br>' +
            '3.' + tabIndentDefault +
            'Sehubungan itu, tuan/puan adalah diminta mengambil perhatian akan Peraturan 13 dalam <b>Pekeliling Perkhidmatan Bil. 17 Tahun 2007</b> iaitu:-<br><br>'+
            
            'Sekian, terima kasih.<br><br><br>' +
            '<b>"WAWASAN KEMAKMURAN BERSAMA 2030"</b><br><br>' +
            '<b>"BERKHIDMAT UNTUK NEGARA"<br><br></b>',
        letterFooter:
            'Saya yang menjalankan amanah,<br><br><br>' +
            '<b>(FARAH SHAHADA BINTI ZAKARIA)</b><br>' +
            'Pengarah<br>' +
            'Bahagian Khidmat Pengurusan<br>' +
            'b.p Ketua Pengarah LKIM<br><br>' +
            's.k:<br><br>' +
            'P(PP)<br><br>' +
            'Fail Peribadi'
    },
];
