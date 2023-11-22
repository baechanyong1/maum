export const mailConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: '여기에 Gmail 계정을 입력해주세요.', // Gmail 계정
    pass: '여기에 앱 비밀번호를 입력해주세요.', // Gmail에서 생성한 앱 비밀번호
  },
  from: '여기에 보내는 사람의 이메일 주소를 입력해주세요.', // 보내는 사람의 이메일 주소
  to: '여기에 수신받을 이메일을 입력해주세요', // 수신자의 이메일 주소
};