class Account {

  constructor(username) {
    this.username = username;

    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }

    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }


}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  isAllowed() {
    if (this.value + this.account.balance > 0){
      return true;
    } else {
      return false
    }
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }

    if (this.isAllowed()) {
      this.time = Date();

      this.account.addTransaction(this);
      return true;
    }
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t0 = new Withdrawal(10.00, myAccount);
t0.commit();

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
console.log(myAccount.transactions);
