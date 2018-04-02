var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var dateFormat = require('dateformat');
var now = new Date();

const delay = require('delay');

// Basic usage
var newemail = dateFormat(now, "yyyymmddhhMMss") + '@resumeteste.com';

//driver.get('https://www.resume.com/');
driver.get('https://www.resume.com/builder#Step1');

var pathproject = require('fs').realpathSync(process.cwd());
console.log(pathproject);


driver.findElement(By.linkText('Details')).click();

delay(14000)
    .then(() => {
        console.log("------Personal Information------");
        driver.findElement(By.id('first_name')).sendKeys('Joana Hellena').then(() => {
            console.log("firstname");
        });
        driver.findElement(By.id('last_name')).sendKeys('Dark Smith');
        driver.findElement(By.id('submitCreateNewAccount1')).click();
    });

delay(17000)
    .then(() => {
        console.log("------Email------");
        driver.findElement(By.id('email')).sendKeys(newemail);
        driver.findElement(By.id('submitCreateNewAccount2')).click();
    });

delay(22000)
    .then(() => {
        console.log("------Job Category------");
        driver.findElement(By.id('job_category')).sendKeys(' Accounting & Finance');
        driver.findElement(By.id('submitCreateNewAccount')).click();
    });

delay(27000)
    .then(() => {
        console.log("------Start Upload Resume------");
        driver.findElement(By.xpath("//div[@id='resumeBuilderEditOptions']/div/div[2]/button")).click();
    });

delay(34000)
    .then(() => {
        console.log("------Set File------");
        driver.findElement(By.id("resumeParse2")).clear();
        driver.findElement(By.id("resumeParse2")).sendKeys(pathproject + "\\resume\\sampleresume.doc");
        driver.findElement(By.id("uploadResumeBtn")).click();
    });

delay(40000)
    .then(() => {
        console.log("------Publish------");

        driver.findElement(By.xpath("//div[@id='resumeBuilderWrapper']/div/button")).click();

    });

delay(44000)
    .then(() => {
        console.log("------Result test------");

        console.log(driver.findElement(By.className("inform-publish-text")).getText().then(function(title) {
            if (title.startsWith('Congratulations')) {
                console.log('success--'+ title);
                driver.quit();
                return true;

            } else {
                console.log('fail-- ' + title);
                driver.quit();
                
            }

        }));

    });