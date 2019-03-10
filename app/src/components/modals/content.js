const welcomeHome = "Welcome to your main page. Use the advanced searchbar below to look for the location of your choice. For more accurate results, make sure to fill in all the relevant fields BEFORE clicking the 'Find Match' button. Finally, the HINT button at the top of the page is always there to help:) Note: You must be LOGGED IN to start!";

export const success = {

  homeHint: [ welcomeHome, "You can search by name, location, or even category (e.g. 'Party') ",
            "We only provide you a maximum of 12 results.", 
            "You can visit the Yelp page for a more in depth review of the location. Click on the MORE button located towards the end of the result's description",
            "Oh yeah...Drink responsibly please!", 
            "You can create as many groups as you want, even for the same location"],

  activitiesHint: [ "You can email the members of your group. A chat service will be available soon",
            "The left side of your dasboard displays activities involving you and other people. You can tell right away by checking the name of the creator in the group's title",
            "We do not request any phone number from you at this point, be cautious in giving that info away."],

  activityCreated: ["Great! Your activity has been created:)", "it will be visible in your ACTIVITIES dashboard"],

  joinedGroup: {confirm: "Join this group? ", done:["Congrats! You've made new friends:)",
            "Head to your ACTIVITIES dashboard to email  or chat with them.",
            "You can of course remain here and look foro other cool places!"]},
            
  activityDeleted: { confirm: "You sure?", done:"Too bad:( but hey, there's an entire city out there:)"},

};

export const failure = {

};

export const loginInfo = {
  title: "Login Process",
  summary: "You're about to provide your email adress for login. This will allow us to verify you email and allow you to login without a password",
}