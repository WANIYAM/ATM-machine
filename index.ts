#! /usr/bin/env node

// importing important files

import inquirer from "inquirer";
import chalk from "chalk";

// letting variables
let balance  = 5000; // dollars
let myPin = "1234" ;

// printing the welcome note 
console.log (chalk.yellow("\t\t\tWELCOME TO ATM \t\t\t\n\n\n"));

// making functions

// asking pin code function
async function askingPin () {
   let askPin= await inquirer.prompt(
    [
        {
            type: 'input',
            name: "pin",
            message :chalk.yellowBright( "\t\t\tEnter Your PIN: \n\t\t\t"),
        }
    ]
   );

   if ( askPin.pin === myPin){
        console.log (chalk.green("\n\t\t !!!AUTHENTICATION APPROVED!!!\t\t"));
       await  askAccountType();
    }else{
        console.log (chalk.red("\n\t\t!!!! AUTHENTICATION FAILED!!!\t\t"));
    };
};
// account type function

 async function askAccountType () {
    let accountType = await inquirer.prompt(
        [
            {
                type: "list",
                name : "account",
                message: chalk.magentaBright("\n\t\tWhich Type Of Account Do you Have?\t\t\n"),
                choices: ['Current' , 'Saving '],
            }
        ]
    );

 console.log(chalk.cyan("\n\t\tYou have selected") + chalk.yellow(`  ${accountType.account}`)+chalk.cyan(" account\t\t\n"));
mainMenu();
}; 


// widhdraw function
async function Withdraw (){
   let withdrawAmount = await inquirer.prompt(
    [
        {
            type:"list",
            name:"amount",
            message:chalk.blueBright("\n\t\tChoose withdrawal amount\t\t\n "),
            choices:["100" , "500" , "1000" , "5000", "other"]
        }
    ]
   );
  if (withdrawAmount.amount<= balance){
    console.log (chalk.white("\n\t\twithdraw")+ chalk.yellow( `  ${withdrawAmount.amount}`)+ chalk.white  (" from your account\n\t\t"));
  } else if ( withdrawAmount.amount === "other"){
    
    let  OtherWithdrawAmount  = await inquirer.prompt(
        [
            {
                type: "input",
                name: "otherAmount",
                message: chalk.cyanBright("\t\tEnter custom withdrawal amount\t\t\n\t\t\t"),
            }
        ]
     );  
     withdrawAmount.amount= OtherWithdrawAmount.otherAmount
     if (OtherWithdrawAmount.otherAmount> balance){
        console.log(chalk.red("\n\t\t!!!INSUFFICIENT FUNDS!!!\t\t\t"));
     }else{
        console.log (chalk.white("\n\t\twithdraw")+ chalk.yellow( `  ${OtherWithdrawAmount.otherAmount}`)+ chalk.white  (" from your account\n\t\t"));
        
     } ;
  }else {
    console.log(chalk.red("\n\t\t!!!INSUFFICIENT FUNDS!!!\t\t\t"));
  };
  if(withdrawAmount.amount>0 && withdrawAmount.amount<= balance){
    balance -= (withdrawAmount.amount)
  }else{
    balance -= 0
  };

 
};

// deposit function
async function Deposit (){
    let depositAmount = await inquirer.prompt (
     [
         {
             type:"list",
             name:"amount",
             message:chalk.blueBright("\n\t\tChoose deposit amount\t\t\n "),
             choices:["100" , "500" , "1000" , "5000", "other"]
         }
     ]
    );
     let amount: number;
 
     if(depositAmount.amount>0 ){
        console.log (chalk.white("\n\t\tDeposited")+ chalk.yellow( `  ${depositAmount.amount}`)+ chalk.white  (" into your account\n\t\t")) ;
     }else if (depositAmount.amount === "other"){
            let  OtherAmount  = await inquirer.prompt(
             [
                 {
                     type: "input",
                     name: "otherAmount",
                     message: chalk.cyanBright("\t\tEnter custom deposit amount\t\t\n\t\t\t"),
                 }
             ]
          );  
            depositAmount.amount = OtherAmount.otherAmount;
            console.log (chalk.white("\n\t\tDeposited ")+ chalk.yellow( `  ${OtherAmount.otherAmount}`)+ chalk.white  (" into your account\n\t\t"));

        }else {
         console.log( chalk.grey("\t\tInsufficient balance !!!!!!\t\t"));
     };

     
 balance += parseFloat( depositAmount.amount);
     
 };
// check balance function
function checkBalance(){
     if (balance > 0){
        console.log (chalk.white("\n\t\tYour current balance is  ") + chalk.yellow(` ${balance}.\t\t\t\n`));
     }else{
         console.log (chalk.white("\n\t\tYour current balance is  " )+ chalk.yellow("0.\t\t\t\n"));
     }
    
};
// main menu function
async function mainMenu (){
   

     let operationsAns  =  await inquirer.prompt(
        [
            {
                name: "operation",
                message: chalk.magenta("\n\t\tWhat would you like to do?\t\t\t\n"),
                type: "list",
                choices: ["Withdraw", "Deposit", "Check Balance", "Exit"]
            }
        ]
     );
     if (operationsAns.operation === "Withdraw"){
        await Withdraw() 
        mainMenu();
     }else if(operationsAns.operation === "Deposit"){
       await Deposit()
       mainMenu();
    } else if (operationsAns.operation === "Check Balance" ){
        checkBalance()
        mainMenu();
    }else {
        console.log(chalk.yellow("\n\t\t Thank you for using the ATM. \n\t\t Have a good day \t\t "))
    };
};
   

// exit function 
await askingPin();
// start ATM