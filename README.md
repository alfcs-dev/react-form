#UPDATE MADE BY @hobbit1mx

Hi, as I am not even close to be a experienced reacat front end developer, I used the coding task as a way to experiment and play around with the react library.
I took a bit more than 3 hours, but as I mentioned this camed with a learning curve, I know there is a lot to be improved in this repo, for example, I think once I had the logic of my inputs I could start to
separate the concerns and create splited components, simplifying the work.

Thanks for considering my application.

To run the project:

```
clone the repo
npm install
npm start
```

# F1 - smava recruitment tasks for front-end developers

Hello! We are very happy to see that you have reached this challenge! The task requires some creativity, we are giving you some description, which is very close to the stuff, that we are actually working in smava.

Solutions need to be provided as a bunch of files. For this task you may want to use some build tools, so we are expecting source code from you but not the minified output because the **code quality** is also important for us.

We wish you best of luck and hope you will have a nice time while solving this task!


## Make a registration form

We would kindly ask you to show us your ability to create a dynamic form. You are allowed to choose any library or framework that will help you to get the job done, although we would prefer to see you working with React.
Please don't spend more than 3 hours on this task. Please make sure that at the end you commented on what you have not managed to finish and please outline how you would solve the remaining work including an estimate of how much time it would have approximately taken you.


### Technical description

1. When a user opens a page he or she sees the following: ![first](https://cloud.githubusercontent.com/assets/812240/23119046/dc0db034-f756-11e6-914f-5991a7483cc4.png)

2. The user should be able to add and remove bank accounts ![second](https://cloud.githubusercontent.com/assets/812240/23119087/080bacb8-f757-11e6-99df-3ee9ba709974.png)

3. The specific input data shall be validated once the user finishes his field input and once again for all data just before the submission of the form to the backend (validation rules - please see bellow). In case of validation errors a
message shall be displayed next to the invalid field. ![third](https://cloud.githubusercontent.com/assets/812240/23119100/13cc82f2-f757-11e6-8570-84040666bcb0.png)

4. When all entered data is valid it should be displayed as a popup message to the user after submission. ![forth](https://cloud.githubusercontent.com/assets/812240/23119112/205d2472-f757-11e6-82b3-b04b564fc073.png)

5. If the user has tried to submit invalid data first and fixed the validation errors afterwards, the whole data set should be validated again on submission.

### Validation rules

* All fields are mandatory

1. **firstName** - should contain only small and capital letters, no numbers, special characters, etc.
1. **lastName** - same as the **firstName**
1. **email** - must be a valid email address
1. **bankAccounts** - must be at least one account
1. **iban** - must be a valid [IBAN](https://en.wikipedia.org/wiki/International_Bank_Account_Number). You may want to use [this library](https://www.npmjs.com/package/iban) for validation.
1. **bankName** - no extra specific requirements, just not be empty.