#! /usr/bin/env node
const axios = require('axios');

async function getBugcrowdPrograms() {
    let offsetArray = [];
    for (let i = 0; i <= 350; i += 25) {
        offsetArray.push(i)
    }
    let programList = [];
    for (let offset of offsetArray) {
            let response = await axios.request({
            url: `https://bugcrowd.com/programs.json?sort[]=name-asc&hidden[]=false&offset[]=${offset}`,
            method: 'get',
            headers: {
                Cookie: `_crowdcontrol_session=${process.env.BUGCROWD_COOKIE}`
            }
        });
        var programs = response.data.programs;
        programs.map(program => {
            programList.push(program.name)
        })
    }
    programList = [...new Set(programList.sort())];
    programList.forEach(program => {
        console.log(program);
    });
};

const start = async function () {
    await getBugcrowdPrograms();
}

if (validation()) {
    start();
  }

function validation() {
    if (!process.env.BUGCROWD_COOKIE) {
      console.error("Missing Bugcrowd Session Cookie");
      return false
    }
    return true
};
