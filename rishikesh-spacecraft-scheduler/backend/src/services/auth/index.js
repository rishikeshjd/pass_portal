import dotenv from "dotenv";
import nodemailer from "nodemailer";
import randomToken from "random-token";
import bcrypt from "bcrypt";
import { userModel } from "../../schemas/user.schema.js";
import { roleModel } from "../../schemas/roles.schema.js";
import { passwordResetModel } from "../../schemas/passwordResets.schema.js";
import jwt from 'jsonwebtoken';
import fs from 'fs';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

//---with Mongo DB
  export const loginRouteHandler = async (req, res, email, password) => {
    console.log("IN Login Route Handler with email:", email)    
  //Check If User Exists
  let foundUser = await userModel.findOne({ username: email });  
  if (foundUser == null) {
    return res.status(400).json({
      errors: [{ detail: "Credentials don't match any existing users" }],
    });
  } else {
    console.log("Valid User: ",foundUser.name);
    console.log("Allowed:", foundUser.allowed);
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (validPassword) {
      //--Get specific functions allowed for the given roles
      let functions = []
      let sats = []
      let stns = []
      let roles = []
      for(let i=0;i<foundUser.allowed.length;i++){
        const role_id = foundUser.allowed[i].role_id;
        let foundRole = await roleModel.findOne({ id : role_id });
        if (foundRole == null) {
          return res.status(400).json({
            errors: [{ detail: "Defined user role is not existing!" }],
          });
	} else{
          console.log("Functions Allowed as ", foundRole.title, " are ", foundRole.functions);
          functions.push(foundRole.functions);
          sats.push(foundUser.allowed[i].satellites);
          stns.push(foundUser.allowed[i].stations);
          roles.push(foundRole.title);
          console.log("For satellites: ", foundUser.allowed[i].satellites, " stations: ", foundUser.allowed[i].stations);  
        }        
      }
      //--Add general user functions
      let foundRole = await roleModel.findOne({ id : "GenUser" });
      console.log("Functions Allowed as ", foundRole.title, " are ", foundRole.functions);
      functions.push(foundRole.functions);
      sats.push("ALL");
      stns.push("ALL");
      roles.push(foundRole.title);
      console.log("For ALL satellites and ALL stations"); 

      // Generate JWT token
      let satellites = sats.join("-");
      console.log(satellites);  
      const token = jwt.sign(
        { id: email, name: foundUser.name, roles:roles.join("-"), functions:functions.join("-"), sats:sats.join("-"), stns: stns.join("-")},
        "token",
        {
          expiresIn: "24h",
        }
      );
            return res.json({
        token_type: "Bearer",
        expires_in: "24h",
        access_token: token,
        refresh_token: token,
      });
    } else {
      return res.status(400).json({
        errors: [{ detail: "Invalid password" }],
      });
    }
  }
};

/*export const loginRouteHandler = async (req, res, email, password) => {
  
  //--Read the user file on node server
  let data = fs.readFileSync('pswd.json');
  let userList= JSON.parse(data);
  //console.log(userList);
  
  //--Check if User exists in the list
  let foundUser = null;
  for(let i=0;i<userList.length;i++){
    if (email === userList[i].user){
      foundUser = userList[i];
      break;
    }     
  }
  
  if (foundUser == null) {
    return res.status(400).json({
      errors: [{ detail: "Credentials don't match any existing users!" }],
    });
  } else {
    //const validPassword = (password === foundUser.password);
    const validPassword = await bcrypt.compare(password, foundUser.password);    
    //console.log(validPassword);
    if (validPassword) {
      console.log("User", foundUser.name, "Logged In");
      // Generate JWT token
      var email = foundUser.user.split("@")[0];
      const token = jwt.sign(
        { id: foundUser.name, email: email, sats: foundUser.sats, roles:foundUser.roles},
        "token",
        {
          expiresIn: "24h",
        }
      );
      return res.json({
        token_type: "Bearer",
        expires_in: "1h",
        access_token: token,
        refresh_token: token,        
      });
    } else {
      return res.status(400).json({
        errors: [{ detail: "Invalid password!" }],
      });
    }
  }
};*/

/*export const registerRouteHandler = async (req, res, name, email, password) => {
  // check if user already exists
  let foundUser = await userModel.findOne({ email: email });
  if (foundUser) {
    // does not get the error
    return res.status(400).json({ message: "Email is already in use" });
  }

  // check password to exist and be at least 8 characters long
  if (!password || password.length < 8) {
    return res
      .status(400)
     .json({ message: "Password must be at least 8 characters long." });
  }

  // hash password to save in db
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    name: name,
    email: email,
    password: hashPassword,
  });
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, "token", {
    expiresIn: "24h",
  });
  return res.status(200).json({
    token_type: "Bearer",
    expires_in: "24h",
    access_token: token,
    refresh_token: token,
  });
};*/

export const registerRouteHandler = async (req, res, name, email, password) => {
  //--Read the user file on node server
  let data = fs.readFileSync('pswd.json');
  let userList= JSON.parse(data);
  
  // check if user already exists
  let foundUser = null;
  for(let i=0;i<userList.length;i++){
    if (email === userList[i].user){
      foundUser = userList[i];
      break;
    }     
  }

  if (foundUser) {
    // does not get the error
    return res.status(400).json({ message: "Email is already in use!" });
  }

  // check password to exist and be at least 8 characters long
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  // hash password to save in db
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = {
      user: email,
      password: hashPassword,
      name: name,
      sats:"SC1,SC2",
      role:"controller"
  };
  userList.push(newUser);

  //--write user list to the server
  let newdata = JSON.stringify(userList, null, 2);
  fs.writeFileSync('pswd.json', newdata, err => {
    // error checking
    if(err) throw err;
    console.log("New data added");
  });   
 
  // Generate JWT token
  const token = jwt.sign({ id: newUser.id, email: newUser.email, sats: newUser.sats }, "token", {

  return res.status(200).json({
    token_type: "Bearer",
    expires_in: "1h",
    access_token: token,
    refresh_token: token,    
  });
};

export const forgotPasswordRouteHandler = async (req, res, email) => {
  let foundUser = await userModel.findOne({ email: email });

  if (!foundUser) {
    return res.status(400).json({
      errors: { email: ["The email does not match any existing user!"] },
    });
  } else {
    let token = randomToken(20);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "admin@jsonapi.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      html: `<p>You requested to change your password.If this request was not made by you please contact us. Access <a href='${process.env.APP_URL_CL>
    });
    const dataSent = {
      data: "password-forgot",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/password-reset`,
        email: email,
      },
    };

    // save token in db
    await passwordResetModel.create({
        email: foundUser.email,
        token: token,
        created_at: new Date(),
    });

    return res.status(204).json(dataSent);
  }
};

export const resetPasswordRouteHandler = async (req, res) => {
  const foundUser = await userModel.findOne({
    email: req.body.data.attributes.email,
  });

  if (!foundUser || !foundToken) {
    return res.status(400).json({errors: { email: ["The email or token does not match any existing user."] }});
  } else {
    const { password, password_confirmation } = req.body.data.attributes;
    // validate password
    if (password.length < 8) {
      return res.status(400).json({
        errors: {
          password: ["The password should have at lest 8 characters."],
        },
      });
    }

    if (password != password_confirmation) {
      return res.status(400).json({
        errors: {
          password: ["The password and password confirmation must match."],
        },
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await passwordResetModel.deleteOne({ email: foundUser.email });

    await userModel.updateOne(
      { email: foundUser.email },
      { $set: { "password": hashPassword } }
    );
    return res.sendStatus(204);
  }
};

export const sendRequestRouteHandler = async (req, res) => {
  console.log("In send request route handler")
  var user = req.body.data.attributes.user;
  console.log("user:",user);
  let requests = req.body.data.attributes;

  /*for(let i=0;i<requests.length;i++){
    console.log("i:",requests[i]);
  }*/
  //let reqType = req.body.data.attributes.reqType;
  //--Read the user file on node server
  //let reqList= JSON.parse(requests);

  //--write user list to the server
  let newdata = JSON.stringify(requests, null, 2);
  var date = new Date().toISOString().substring(0, 19).replace('T', '_'); //--gives time in UT
  //var filename = "Req_"+date.getDate()+(date.getMonth()+1)+date.getFullYear()+"_"+date.getHours()+date.getMinutes()+date.getSeconds()+".json";
  //var filename = "Req_"+user+"_"+date+".json";
  var filename = "Request_Master.txt";+user+"_"+date+".json";
  fs.writeFileSync(filename, newdata, err => {
    // error checking
    if(err) throw err;
    console.log("New request added");
  });   

  //return res.status(400).json({errors: { email: ["Error"] }});
  return res.sendStatus(204);
};

export const getClashSummaryRouteHandler = async (req, res, pass) => {
  console.log("In clash summary request route handler")
  var user = req.body.data.attributes.user;
  console.log("user:",user);
  let rec = req.body.data.attributes.pass;
  console.log("Required Pass", rec);
  
  //--Read the shedule file on node server
  let sch = fs.readFileSync('data.json');
  let records = JSON.parse(sch);

  console.log("first pass",records[0]);
 
  return res.sendStatus(204);
};


/*export const logoutRouteHandler = async (req, res) => {.....
  user name display in UI
  forgot password and reset password implementation
  */
  export const getUsersRouteHandler = async (req, res) => {
    console.log("IN get users Route Handler :");
  
    //--Get all the users from DB
    let foundUsers = await userModel.find();  
    if (foundUsers == null) {
      return res.status(400).json({
        errors: [{ detail: "No users found in Database" }],
      });
    } else {
      console.log("Users found = ",foundUsers.length);
      /*let userNames = [];
      let userIds = [];
      let userRoles = [];
      let userSats = [];
      let userStns = [];
     for(let i=0;i<foundUsers.length;i++){ 
          let usr = foundUsers[i];
          userNames.push(usr.name);
          userIds.push(usr.username);
          let roles = [];
          let sats = [];
          let stns = [];
          for(let j=0;j<usr.allowed.length;j++){
            roles.push(usr.allowed[j].role_id);
            sats.push(usr.allowed[j].satellites);
            stns.push(usr.allowed[j].stations);
          }
          userRoles.push(roles.join("-"));
          userSats.push(sats.join("-"));
          userStns.push(stns.join("-"));
      }
  
      console.log(userNames, userNames.length);
  
      const sentData = { 
        data: "get-users",
        attributes: {
          names : userNames,
          ids : userIds,
          roles : userRoles,
          sats : userSats,
          stns: userStns,
        },
      };*/

      if(foundUsers.length>0){
        console.log("sending",foundUsers);
        return res.send(foundUsers);     
      } else {
        res.status(400);
        return res.send({error: "No users found in Database!" });        
      }
    }
  };






