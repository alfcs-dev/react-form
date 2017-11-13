import React, { Component } from 'react';
import IBAN from 'iban';
import './Form.css';
class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      bankAccounts: [],
      errors: {
        firstName: {
          hasError: false
        },
        lastName: {
          hasError: false
        },
        email: {
          hasError: false
        },
        bank: [],
        iban: [],
        emptyAccounts: false
      }
    }
    this.addBankAccount = this.addBankAccount.bind(this);
    this.removeBankAccount = this.removeBankAccount.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBankAccountInput = this.handleBankAccountInput.bind(this);
  }

  validateField(field, validityState, index=null) {
    if(validityState.valid) {
      this.setState(prevstate => {
        let copyState = Object.assign({}, prevstate);
        if (index) {
          copyState.errors[field][index].hasError = false;
        } else {
          copyState.errors[field].hasError = false;
        }
        return copyState;
      })
    } else {
      this.setState(prevstate => {
        let copyState = Object.assign({}, prevstate);
        if (index !== null) {
          copyState.errors[field][index] = {
            hasError: true,
            message: validityState.message ? validityState.message :  `${field} is required`
          }
        } else {
          copyState.errors[field] = {
            hasError: true,
            message: validityState.message ? validityState.message :  `${field} is required`
          }
        }
        return copyState;
      })
    }
  }

  validateIban(value) {
    const isValid = IBAN.isValid(value);
    if(!isValid) {
      return {
        valid: IBAN.isValid(value),
        message: value ? 'Please input a valid IBAN' : 'IBAN is required'
      }
    } else {
      return {valid: true}
    }
  }

  validateEmail(value, elementValidity) {
    if (value && !elementValidity.valid) {
      return {
        valid: false,
        message: 'Please set a valid email'
      }
    } else if(value && elementValidity.valid){
      return {valid: true}
    } else {
      return {
        valid: false,
        message: 'Email is a required field'
      }
    }
  }

  handleUserInput(e) {
    const {name, value} = e.target;
    let validity;
    if (name === 'firstName' || name === 'lastName') {
      validity = e.target.validity;
    } else if(name === 'email') {
      validity = this.validateEmail(value, e.target.validity);
    }
    this.setState({[name]: value}, () => this.validateField(name, validity));
  }

  handleSubmit(e) {
    e.preventDefault();
    const {errors, ...form} = this.state;
    const fields = Object.keys(form);
    let isFormValid = true;
    if (!this.state.bankAccounts.length) {
      isFormValid = false;
      this.setState(prevstate => {
        let newState = Object.assign({}, prevstate);
        newState.errors.emptyAccounts = true;
        return newState;
      })
    } else {
      this.setState(prevstate => {
        let newState = Object.assign({}, prevstate);
        newState.errors.emptyAccounts = false;
        return newState;
      })
    }
    fields.forEach(field => {
      if (!this.state[field] && field !== 'bankAccounts') {
        this.validateField(field, {valid: false});
        isFormValid = false;
      } else if (field === 'bankAccounts' && this.state.bankAccounts.length) {
        this.state.bankAccounts.forEach((account, index) => {
          let keys = Object.keys(account);
          keys.forEach(k => {
            if(account[k] === "" || account[k] === undefined) {
              isFormValid = false;
              this.validateField(k, {valid: false}, index);
            }
          })
        })
      }
    });

    if(isFormValid) {
      alert(JSON.stringify(form));
    }
  }

  handleBankAccountInput(e) {
    const {name, value} = e.target;
    const [inputName, index] = name.split('-');
    let validity = {};
    if (inputName === 'bank') {
      validity = e.target.validity;
    } else {
      validity = this.validateIban(value);
    }
    this.setState(prevstate => {
      let account = Object.assign({}, prevstate);
      account.bankAccounts[index][inputName] = value;
      return account;
    }, () => this.validateField(inputName, validity, index));
  }

  addBankAccount(e) {
    e.preventDefault();
    const newBankAccount = {
      bank: '',
      iban: ''
    };
    this.setState(prevState => {
      let copy = Object.assign({}, prevState);
      copy.bankAccounts = [...prevState.bankAccounts, newBankAccount];
      copy.errors.iban = [...prevState.errors.iban, {hasError: false}];
      copy.errors.bank = [...prevState.errors.bank, {hasError: false}];
      copy.errors.emptyAccounts = false;
      return copy;
    });
  }

  removeBankAccount(index) {
    this.setState(prevState => {
      prevState.bankAccounts.splice(index, 1)
      return {
        bankAccounts: prevState.bankAccounts
      }
    });
  }

  render () {
    return (
     <form className='Form' onSubmit={this.handleSubmit} noValidate>
       <h2>Register account</h2>
       <div className='form-group'>
          <label htmlFor='firstName'>First name</label>
          <input type='text' className={`form-input ${this.state.errors.firstName.hasError ? 'error' : ''}`} required
           name='firstName' onChange={this.handleUserInput} />
           {this.state.errors.firstName.hasError ? <span className='error-message '>{this.state.errors.firstName.message}</span> : null}
        </div>
      <div className='form-group'>
        <label htmlFor='lastName'>Last name</label>
        <input type='text' className={`form-input ${this.state.errors.lastName.hasError ? 'error' : ''}`} required
          name='lastName' onChange={this.handleUserInput}  />
          {this.state.errors.lastName.hasError  ? <span className='error-message '>{this.state.errors.lastName.message}</span> : null}
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' className={`form-input ${this.state.errors.email.hasError ? 'error' : ''}`} required
          name='email'  onChange={this.handleUserInput} />
          {this.state.errors.email.hasError ? <span className='error-message '>{this.state.errors.email.message}</span> : null}
      </div>
      <div className="bank-accounts">
        <h3>Bank accounts</h3>
        {this.state.errors.emptyAccounts ? <span className='error-message '>Please insert at least one account</span> : null}
        {
          this.state.bankAccounts.map((ba, index) => {
            return <div key={index}>
                <div className='form-group'>
                  <label htmlFor={`iban${index}`}>IBAN</label>
                  <div className='iban-wrapper'>
                    <input  type='text' className={`form-input iban-input ${this.state.errors.iban[index].hasError ? 'error' : ''}`} required
                    name={`iban-${index}`}  onChange={this.handleBankAccountInput} />
                    <i className='fa fa-trash' onClick={() => this.removeBankAccount(index)}></i>
                  </div>
                  {this.state.errors.iban[index].hasError ? <span className='error-message '>{this.state.errors.iban[index].message}</span> : null}
                </div>
                <div className='form-group'>
                  <label htmlFor={`bank${index}`}>Bank</label>
                  <input type='text' className={`form-input ${this.state.errors.bank[index].hasError ? 'error' : ''}`} required
                    name={`bank-${index}`}  onChange={this.handleBankAccountInput} />
                  {this.state.errors.bank[index].hasError ? <span className='error-message '>{this.state.errors.bank[index].message}</span> : null}
                </div>
              </div>
          })
        }
        <button className='btn add-account' onClick={this.addBankAccount}>Add bank account</button>
      </div>
      <div className="submit">
        <button type='submit' className='btn btn-primary'>
            Submit!
        </button>
       </div>
     </form>
   )
 }
}
export {Form};