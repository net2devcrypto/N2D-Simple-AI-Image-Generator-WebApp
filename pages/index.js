import { useState } from "react";
import { generateStable, generateCustom, generateDallE } from "@/components/interface";
import Head from "next/head";

export default function Generate() {
  const [picture, getPicture] = useState("black-swirl.gif");
  const [model, getModel] = useState('No model selected');

  async function reset() {
    getModel('No model selected');
  }

  async function custom() {
    let aimodel = document.getElementById("aimodel").value.toString();
    getModel(aimodel);
  }

  async function generateImg() {
    let init = 'Generating Image, eta up-to 50 secs, Please Wait...'
    document.getElementById("status").innerHTML = init
    let prompt = document.getElementById("prompt").value.toString()
    let aimodel = document.getElementById("aimodel").value.toString()
    if (model == 'stable') {
      console.log('Stable Selected');
      let output = await generateStable(prompt);
      getPicture(output);
      let msg = 'Image Generated!'
      document.getElementById("status").innerHTML = msg
      return;
    }
    if (model == 'midjourney') {
      console.log('Midjourney Selected');
      let output = await generateCustom(prompt, model);
      getPicture(output);
      let msg = 'Image Generated!'
      document.getElementById("status").innerHTML = msg
      return;
    }
    if (model == 'dalle') {
      console.log('Dall-E Selected');
      let output = await generateDallE(prompt);
      getPicture(output);
      let msg = 'Image Generated!'
      document.getElementById("status").innerHTML = msg
      return;
    }
    else {
      let output = await generateCustom(prompt, aimodel);
      getPicture(output);
      let msg = 'Image Generated!'
      document.getElementById("status").innerHTML = msg
      return;
    }
  }



  return (
    <div>
      <Head>
        <title>Net2Dev AI Image Generator</title>
      </Head>  
      <div className="container" style={{ fontFamily: "SF Pro Display" }}>
        <div className="row g-6">
          <div className="col-lg-3">
            <img
              className="mb-2 d-flex"
              src="net2dev.png"
              width="200"
              height="65"
            />
            <h6>Subscribe to my Youtube!</h6>
            <a href="http://youtube.net2dev.io" target="_blank">
            <img
              className="mb-3 d-flex"
              src="ytlogo.png"
              width="170"
              height="60"
            />
            </a>
            <h6>Follow me on Github!</h6>
            <a href="https://github.com/net2devcrypto" target="_blank">
            <img
              className="mb-3 d-flex"
              src="github.png"
              width="170"
              height="40"
            />
            </a>
            <h6>Cool AI Generator Models!</h6>
            <a href="https://stablediffusionapi.com/models" target="_blank">
            <img
              className="mb-3 d-flex"
              src="ai-models.png"
              width="170"
              height="50"
            />
            </a>
            <h6>Best AI Image Prompts!</h6>
            <a href="https://prompthero.com/ai-prompts" target="_blank">
            <img
              className="mb-3 d-flex"
              src="prompts.png"
              width="170"
              height="50"
            />
            </a>
            <a href="disclaimer">
            <h5>Terms of Use.</h5>
            </a>
          </div>
          
          <div className="col-md-3 col-lg-9">
            <img className="d-flex justify-content-start align-items-right mt-2 mb-2"
            src="logo.png" width="300" height="50"/>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                rows="10"
                id="prompt"
                placeholder="Enter Prompt Description"
                style={{
                  backgroundColor: "#d3d3d310",
                  fontWeight: "bold",
                  color: "white",
                }}
              />
            </div>
            <div className="row">
            <h5 className="mt-4">Select your AI Image Generator Model</h5>
            <div className="col-md-4 mt-1">
            <button
              className="w-100 btn btn-primary btn-md"
              value="stable"
              style={{
                backgroundColor: "primary",
                fontWeight: "lighter",
                fontSize: "30px",
              }}
              onClick={(e) => getModel(e.target.value)}
            >
              Stable Diffusion
            </button>
            </div>
            <div className="col-md-4 mt-1">
            <button
              className="w-100 btn btn-primary btn-md"
              value="midjourney"
              style={{
                backgroundColor: "primary",
                fontWeight: "lighter",
                fontSize: "30px",
              }}
              onClick={(e) => getModel(e.target.value)}
            >
              MidJourney
            </button>
            </div>
            <div className="col-md-4 mt-1">
            <button
              className="w-100 btn btn-primary btn-md"
              value="dalle"
              style={{
                backgroundColor: "primary",
                fontWeight: "lighter",
                fontSize: "30px",
              }}
              onClick={(e) => getModel(e.target.value)}
            >
              OpenAi Dall-E
            </button>
            </div>
              </div>
            <div className="row">
            <div className="col-sm-5 mt-3">
            <input
                className="form-control"
                id="aimodel"
                onChange={custom}
                placeholder="Or input custom AI Model (optional)"
                style={{
                  backgroundColor: "#d3d3d310",
                  fontWeight: "bold",
                  color: "white",
                }}
              />
              </div>
              <div className="col-sm-5 mt-4">
              <h5 style={{
                  color: "white",
                }}>Model Selected: {model}</h5>
              </div>
              <div className="col-sm-2 mt-3">
              <button className="w-100 btn btn-primary btn-md"
              onClick={reset}>Reset Model</button>
              </div>
              <div className="col-sm-12 mt-2">
            <button
              className="w-100 btn btn-primary btn-md mt-2"
              style={{
                fontWeight: "lighter",
                fontSize: "25px",
              }}
              onClick={generateImg}
            >
              Generate Image
            </button>
            </div>
            <div className="mt-2" id="status" style={{fontSize:'23px', color:'white'}}/>
              </div>
            <div className="row mt-2 d-flex">
              <img
                className="bd-placeholder-img"
                src={picture}
                width="100%"
                height="100%"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              />
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
