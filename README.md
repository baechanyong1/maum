<div align=center>
<h3> :blush:소개 </h3>
설문지를 생성,수정,삭제,조회가 가능한 서비스. <br>
설문지 생성, 수정, 삭제, 조회, 설문지 완료, 완료된 설문지 확인 기능이 있습니다

<h3>사용한 기술 스택<h3>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img alt="GraphQL" src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white">
<img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-376E9B?style=for-the-badge&logo=typeorm&logoColor=white">
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">

<h3>ERD<h3>
![Alt text](image.png)

<h4>Link<h4>
https://www.erdcloud.com/d/wn6XsubF9MzD75iaT

<h4>서버 실행 전 확인바랍니다.</h4>
postgres 설치 유무 :arrow_right: localhost 환경의 postgres 서버를 사용합니다.<br>
/src/config/typeorm.config.service.ts 파일 확인 :arrow_right: localhost 환경의 postgres 서버를 사용하기 위해 typeormConfig 작성이 필요합니다.<br>
/src/config/mail.config.ts 파일 확인 :arrow_right: 에러 발생 시 메일을 보내기 위해 mailConfig 작성이 필요합니다.
<h3>서버 실행 순서<h3>
:arrow_down: npm install<br>
:arrow_down: ts-node -r tsconfig-paths/register seed.ts(더미데이터 생성)<br>
:arrow_down: npm start<br>
localhost:4000/graphql 혹은 localhost:4000/api 주소로 접속 후 테스트<br>
<h4>에러 발생 시 메일 전송 및 /logs/date.log 파일에 로그가 작성됩니다.</h4>
</div>

## GraphQL

### GraphQL 쿼리

---

#### `option(id: Int!): Option!`

- 설명: 특정 ID의 옵션을 가져옵니다.

```
query {
  option(id: 9) {
    desc
  }
}
```

- 매개변수:
  - `id` (Int): 옵션의 ID.
- 반환값:
  - `Option`: 요청한 옵션.<br><br>

#### `findAllAnswers: [Answer!]!`

- 설명: 모든 답변 목록을 가져옵니다.

```
query {
  findAllAnswers {
    desc
  }
}
```

- 반환값:
  - `[Answer!]`: 답변 목록.<br><br>

#### `findAnswerById(answerId: Float!): Answer!`

- 설명: 특정 ID의 답변을 가져옵니다.

```
query {
  findAnswerById(answerId: 123) {
    desc
    point
    optionId
  }
}
```

- 매개변수:
  - `answerId` (Float): 답변의 ID.
- 반환값:
  - `Answer`: 요청한 답변.<br><br>

#### `completedByQuestionnaireId(id: Int!): [Completed!]!`

- 설명: 특정 ID의 설문 조사 완료 목록을 가져옵니다.

```
query {
  completedByQuestionnaireId(id: 123) {
    questionnaireId
    question
		total
  }
}

```

- 매개변수:
  - `id` (Int): 설문 조사의 ID.
- 반환값:
  - `[Completed!]`: 완료된 설문 조사 목록.<br><br>

#### `completed(id: Int!): Completed!`

- 설명: 특정 ID의 완료된 설문 조사의 세부 정보를 가져옵니다.

```
query {
  completed(id: 21) {
    completedId
    questionnaireId
    question {
      optionId
      answerId
      point
    }
    total
  }
}
```

- 매개변수:
  - `id` (Int): 설문 조사의 ID.
- 반환값:
  - `Completed`: 요청한 완료된 설문 조사.

#### `question(id: Int!): Question!`

- 설명: 특정 ID의 질문을 가져옵니다.

```
query {
  question(id: 22) {
    desc
  }
}
```

- 매개변수:
  - `id` (Int): 질문의 ID.
- 반환값:
  - `Question`: 요청한 질문의 정보.

#### `questionnaire(id: Int!): Questionnaire!`

- 설명: 특정 ID의 설문 조사를 가져옵니다.

```
query {
  questionnaire(id: 9) {
    questionnaireId
    questions {
      desc
      options {
        optionId
        desc
        answers {
          answerId
          desc
          point
        }
      }
    }
    completed {
      completedId
      questionnaireId
      total
    }
    desc
  }
}
```

- 매개변수:
  - `id` (Int): 설문 조사의 ID.
- 반환값:
  - `Questionnaire`: 요청한 설문 조사의 정보.

#### `AllOfByQuestionnaireId(questionnaireId: Float!): [Questionnaire!]!`

- 설명: 특정 설문 조사 ID에 속하는 모든 질문을 가져옵니다.

```
query GetAllByQuestionnaireId($questionnaireId: Float!) {
  AllOfByQuestionnaireId(questionnaireId: $questionnaireId) {
    # Questionnaire 스키마에 대한 필드들이 여기 들어갑니다.
    questionnaireId
    questions {
      # Question 스키마에 대한 필드들이 여기 들어갑니다.
    }
    completed {
      # Completed 스키마에 대한 필드들이 여기 들어갑니다.
    }
    desc
  }
}
```

- 매개변수:
  - `questionnaireId` (Float): 질문을 가져올 설문 조사의 ID.
- 반환값:
  - `[Questionnaire!]`: 요청한 설문 조사 ID에 속하는 모든 질문의 목록.

### GraphQL 뮤테이션

---

#### `createOption(questionId: Float!, createOptionInput: CreateOptionInput!): Option!`

- 설명: 특정 질문에 대한 새로운 옵션을 생성합니다.

```
mutation {
  createOption(questionId: 22, createOptionInput: { desc:"desc" }) {
    desc
  }
}
```

- 매개변수:
  - `questionId` (Float): 질문의 ID.
  - `createOptionInput` (CreateOptionInput): 새로운 옵션의 입력 데이터.
- 반환값:
  - `Option`: 생성된 옵션.

#### `updateOption(id: Int!, updateOptionInput: UpdateOptionInput!): Option!`

- 설명: 특정 ID의 옵션을 업데이트합니다.

```
mutation {
  updateOption(id: 9, updateOptionInput: { id:9,desc:"desc" }) {
    desc
  }
}
```

- 매개변수:
  - `id` (Int): 업데이트할 옵션의 ID.
  - `updateOptionInput` (UpdateOptionInput): 업데이트할 옵션의 입력 데이터.
- 반환값:
  - `Option`: 업데이트된 옵션.

#### `removeOption(id: Int!): Option!`

- 설명: 특정 ID의 옵션을 삭제합니다.
- 매개변수:
  - `id` (Int): 삭제할 옵션의 ID.
- 반환값:
  - `Option`: 삭제된 옵션.

#### `createAnswer(optionId: Float!, createAnswerInput: CreateAnswerInput!): Answer!`

- 설명: 특정 옵션에 대한 새로운 답변을 생성합니다.
- 매개변수:
  - `optionId` (Float): 답변을 생성할 옵션의 ID.
  - `createAnswerInput` (CreateAnswerInput): 새로운 답변의 입력 데이터.
- 반환값:
  - `Answer`: 생성된 답변.

#### `updateAnswer(id: Int!, updateAnswerInput: UpdateAnswerInput!): Answer!`

- 설명: 특정 ID의 답변을 업데이트합니다.

```
mutation {
  updateAnswer(id: 33, updateAnswerInput: { id:33, desc:"desc2",point:2 }) {
    desc
    point
  }
}
```

- 매개변수:
  - `id` (Int): 업데이트할 답변의 ID.
  - `updateAnswerInput` (UpdateAnswerInput): 업데이트할 답변의 입력 데이터.
- 반환값:
  - `Answer`: 업데이트된 답변.

#### `deleteAnswer(id: Int!): Answer!`

- 설명: 특정 ID의 답변을 삭제합니다.
- 매개변수:
  - `id` (Int): 삭제할 답변의 ID.
- 반환값:
  - `Answer`: 삭제된 답변.

#### `completion(createCompletionInput: CreateCompletedInput!): Completed!`

- 설명: 완료된 설문 조사를 생성합니다.

```
mutation {
  completion(createCompletionInput: {
    questionnaireId: 10,
    question: [
      { optionId: 9, answerId: 33, point:0 },
      # 다른 question 항목들을 필요에 따라 추가하세요
    ]
  }) {
    completedId
    questionnaireId  # 수정된 부분: questionnaireId 직접 선택
    question {
      optionId
      answerId
      point
    }
    total
  }
}
```

- 매개변수:
  - `createCompletionInput` (CreateCompletedInput): 완료된 설문 조사의 입력 데이터.
- 반환값:
  - `Completed`: 생성된 완료된 설문 조사.

#### `createQuestion(questionnaireId: Float!, createQuestionInput: CreateQuestionInput!): Question!`

- 설명: 특정 설문 조사에 대한 새로운 질문을 생성합니다.

```
mutation {
  createQuestion(questionnaireId: 10, createQuestionInput: { desc:"desc" }) {
    desc
  }
}
```

- 매개변수:
  - `questionnaireId` (Float): 질문을 생성할 설문 조사의 ID.
  - `createQuestionInput` (CreateQuestionInput): 새로운 질문의 입력 데이터.
- 반환값:
  - `Question`: 생성된 질문.

#### `updateQuestion(id: Int!, updateQuestionInput: UpdateQuestionInput!): Question!`

- 설명: 특정 ID의 질문을 업데이트합니다.

```
mutation {
  updateQuestion(id:22 ,updateQuestionInput: { id: 22, desc: "desc2" }) {
    desc
  }
}
```

- 매개변수:
  - `id` (Int): 업데이트할 질문의 ID.
  - `updateQuestionInput` (UpdateQuestionInput): 업데이트할 질문의 입력 데이터.
- 반환값:
  - `Question`: 업데이트된 질문.

#### `removeQuestion(id: Int!): Question!`

- 설명: 특정 ID의 질문을 삭제합니다.
- 매개변수:
  - `id` (Int): 삭제할 질문의 ID.
- 반환값:
  - `Question`: 삭제된 질문.

#### `createQuestionnaire(createQuestionnaireInput: CreateQuestionnaireInput!): Questionnaire!`

- 설명: 새로운 설문 조사를 생성합니다.

```
mutation {
  createQuestionnaire(createQuestionnaireInput: {desc: "desc"}) {
    desc
  }
}
```

- 매개변수:
  - `createQuestionnaireInput` (CreateQuestionnaireInput): 새로운 설문 조사의 입력 데이터.
- 반환값:
  - `Questionnaire`: 생성된 설문 조사.

#### `updateQuestionnaire(updateQuestionnaireInput: UpdateQuestionnaireInput!): Questionnaire!`

- 설명: 설문 조사를 업데이트합니다.

```
mutation {
  updateQuestionnaire(updateQuestionnaireInput: { id: 10, desc:"desc2" }) {
	desc
}
}
```

- 매개변수:
  - `updateQuestionnaireInput` (UpdateQuestionnaireInput): 업데이트할 설문 조사의 입력 데이터.
- 반환값:
  - `Questionnaire`: 업데이트된 설문 조사.

#### `removeQuestionnaire(id: Int!): Questionnaire!`

- 설명: 특정 ID의 설문 조사를 삭제합니다.
- 매개변수:
  - `id` (Int): 삭제할 설문 조사의 ID.
- 반환값:
  - `Questionnaire`: 삭제된 설문 조사.
