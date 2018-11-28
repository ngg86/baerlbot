const Discord = require("discord.js");
const quotefile = "Quotes.txt";
const errorfile = "Errors.txt";
const insultfile = "Insults.txt";
var fs = require("fs");
var randomString;

const client = new Discord.Client();
const prefix = "!";
const roll = "roll";
const plus = "+";
const min = "-";
const quote = "quote";
const insult = "insult";

var quotetext = fs.readFileSync(quotefile, 'utf8');
var quotes = quotetext.split('\n');
var errortext = fs.readFileSync(errorfile, 'utf8');
var errors = errortext.split('\n');
var insulttext = fs.readFileSync(insultfile, 'utf8');
var insults = insulttext.split('\n');


client.on("ready", () => {
console.log("Ready!");
});

client.on("message",(message) =>
{
	if (!message.content.startsWith(prefix))
	{ 
		return;
	}
	
	if(message.content.startsWith(prefix+quote))
	{		
		return message.channel.send(GetRandomString(quotes));
	}
	
	else if(message.content.startsWith(prefix+insult))
	{
		return message.channel.send(GetRandomString(insults));
	}
	
	else if(message.content.startsWith(prefix+roll))
	{
		var sender = message.author;
		
		//get everything after "!roll"
		var substr = message.content.substring(5);
		
		//substr is something like "20" or "20+6"
		if(substr.length == 0) return message.channel.send(GetRandomString(errors));
		
		var parameter = "";
		var numstring = "";
		var result = 0;
		
		if(message.content.includes(plus))
		{
			//numstring is the leftover characters after a '+'
			numstring = message.content.substring(message.content.lastIndexOf(plus)+1);
			
			//make substring the numbers before the '+'
			substr = substr.substring(0,substr.indexOf(plus));
			
			//if substr is not a number, return and throw error
			if(isNaN(substr))
			{				
				return message.channel.send(GetRandomString(errors));
			}
			
			//after checking that substr valid is, create random number between 1 and substr
			result = Math.floor((Math.random() * Number(substr)) + 1);
			
			//if numstring is an empty string, then wasnt supplied
			if(numstring.length == 0)
			{				
				return message.channel.send(sender + " rolled a " + result + "!")
			}
			
			//if numstring is not a number, return and throw error
			else if(isNaN(numstring))
			{
				return message.channel.send(GetRandomString(errors));
			}
			
			else
			{
				var total = Number(result)+Number(numstring);
				return message.channel.send(sender + " rolled a " + total + "!" + " (" + result + " + " + numstring + ")");
			}
		//return message.channel.send(substr + " : " + numstring);		
		}
		else if(message.content.includes(min))
		{
			//numstring is the leftover characters after a '-'
			numstring = message.content.substring(message.content.lastIndexOf(min)+1);
			//make substring the numbers before the '-'
			substr = substr.substring(0,substr.indexOf(min));
		
		
			//if substr is not a number, return and throw error
			if(isNaN(substr))
			{
				return message.channel.send(GetRandomString(errors));
			}
			
			//after checking that substr valid is, create random number between 1 and substr
			result = Math.floor((Math.random() * Number(substr)) + 1);
			
			//if numstring is an empty string, then wasnt supplied
			if(numstring.length == 0)
			{
				
				return message.channel.send(sender + " rolled a " + result + "!")
			}
			//if numstring is not a number, return and throw error
			else if(isNaN(numstring))
			{
				return message.channel.send(GetRandomString(errors));
			}
			else
			{
				var total = Number(result)-Number(numstring);
				return message.channel.send(sender + " rolled a " + total + "!" + " (" + result + " - " + numstring + ")");
			}
		}
		else
		{
			if(!isNaN(substr))
			{
				result = (Math.floor(Math.random() * Number(substr))+1);
				return message.channel.send(sender + " rolled a " + result + "!");
			}
			if(isNaN(substr))
			{
				return message.channel.send(GetRandomString(errors));
			}			
		}
	}
});

function GetRandomString(array)
{
	var i = Math.floor(Math.random() * array.length);
	return array[i];
}

client.login("");