export const mailConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'chanyongbae341@gmail.com', // Gmail 계정
    pass: 'avrgjaqnrodvtyis', // Gmail에서 생성한 앱 비밀번호
  },
  from: 'chanyongbae341@gmail.com', // 보내는 사람의 이메일 주소
  to: 'chanyongbae341@gmail.com', // 수신자의 이메일 주소
};
