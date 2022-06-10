/**
 * 教程 
 *
 * 教程    这里是写脚本说明的地方
 * 本脚本仅用于学习使用请勿直接运行
 * 
 * ========= 青龙 =========
 * 变量格式：  多个账号用 @分割 
 * 
 */
const jsname = '快手极速版'
const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';      // 这里是 node（青龙属于node环境）通知相关的
const { default: Request } = require('got/dist/source/core');
const { request } = require('http');
const querystring = require('querystring');
const { get } = require('request');
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
let ksgscookie = ''             // 这里是 从青龙的 配置文件 读取你写的变量
let kscookieArr = [];
let cookie = '';
let msg = '';
let index = 0;
let nameArr = [];
let nickname = ''
let lid = '0';
let withdraw = false;
let withdrawtime = '';
let sp_161 = true;
let sp_11 = true;
let sp_161_80 = true;
let sp_11_80 = true;
let sp_259 = true;
let fenge = 506;
let enc = ''
let sig, sig3, tokensig, salt, didi, apist, ud, apihost, token = ''
let ssid = ""
let signum = 0
let jbdh, tx = 'false'
let didblack=false
!(async () => {
    if ($.isNode) {
        ksgscookie = $.isNode() ? process.env.ksjsbcookie : ''
        $.withdrawtime = $.isNode() ? process.env.ksjsbWithdrawTime : '14'
        $.tx = $.isNode() ? (process.env.ksjsbtx ? process.env.ksjsbtx : 'false') : 'false'
        $.token = $.isNode() ? process.env.ksjsbapitoken : ''
    }
    else {
        ksgscookie = $.getdata('ksjsbcookie')
        $.withdrawtime = $.getdata('ksjsbWithdrawTime')
        $.tx = $.getdata('ksjsbtx')
        $.token = $.getdata('ksjsbapitoken')
    }
    if (debug) {
        console.log(ksgscookie)
    }
    if (!(await Envs()))  	//多账号分割 判断变量是否为空  初步处理多账号
        return;
    else {
        console.log(`\n\n=========================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
            new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
            8 * 60 * 60 * 1000).toLocaleString()} \n=========================================\n`);
        console.log(`\n设定提现时间:${$.withdrawtime}\n\n`)
        console.log(`\n设定是否提现:${$.tx}\n\n`)
        console.log(`\n=================== 共找到 ${kscookieArr.length} 个账号 ===================`)
        if (debug) {
            console.log(`【debug】 这是你的全部账号数组:\n ${kscookieArr}`);
        }
        $.fenge = 100
        /* await getenv()
         return*/
        console.log(`\n========= 获取账号信息 =========\n`)
        let now = new Date().getHours().toString()
        if (now == $.withdrawtime && $.tx == "true") {
            withdraw = true
        }
        let ckk = ''
        let iii = 19
        
        for (let i = 0; i < kscookieArr.length; i++) {
            $.index = i + 1
            let ck = kscookieArr[i]
            let cktemp = querystring.parse(ck)
            if (cktemp.did && cktemp['kuaishou.api_st'] && cktemp.client_salt) {
                $.didi = cktemp.did
                $.apist = cktemp['kuaishou.api_st']
                $.salt = cktemp.client_salt
                if (cktemp.ud) {
                    $.ud = cktemp.ud
                } else {
                    $.ud = ' '
                }
                $.cookie = `kpn=NEBULA; kpf=ANDROID_PHONE;c=XIAOMI; ver=10.3; appver=10.3.31.3276; client_key=2ac2a76d; language=zh-cn; countryCode=CN; sys=ANDROID_9; mod=Xiaomi%28MI+6%29; net=WIFI; deviceName=Xiaomi%28MI+6%29; isp=; did_tag=7;kcv=1458; app=0; bottom_navigation=true; android_os=0; boardPlatform=msm8998; androidApiLevel=28; newOc=XIAOMI; slh=0; country_code=cn; nbh=0; hotfix_ver=; did_gt=1652302313321; keyconfig_state=2; max_memory=256; oc=XIAOMI; sh=1920; app_status=3; ddpi=480; deviceBit=0; browseType=3; power_mode=0; socName=Qualcomm+MSM8998; sw=1080; ftt=; apptype=22; abi=arm64; cl=0; userRecoBit=0; device_abi=arm64; totalMemory=5724; grant_browse_type=AUTHORIZED; iuid=; rdid=${$.didi}; sbh=72; darkMode=false; kuaishou.api_st=${$.apist}; kuaishou.h5_st=${$.apist}; is_background=0; did=${$.didi}; oDid=TEST_${$.didi};`     // 这里是分割你每个账号的每个小项   
                await getUserInfo();
                if ($.nickname) {
                    nameArr.push($.nickname)
                    ckk += `{ "id": ${iii} , "ck": "${kscookieArr[i]}" ,"name": "${$.nickname}" ,"paydata": "31-6" ,"pay_OK": "ture"},`
                    iii += 1
                }
                //await $.wait(1 * 1000);
            } else {
                console.log(`第 [ ${$.index} ]个账号cookie错误，请确认。`)
                return
            }
        }
        //console.log(ckk)
        //return
        if (now == $.withdrawtime && withdraw == true) {
            await SendMsg(msg);
        }
        console.log(`\n========= 开始执行任务 =========\n`)
        for (let i = 0; i < 1; i++) {
            for (let i = 0; i < kscookieArr.length; i++) {
                $.index = i + 1
                $.signum = 0
                let ck = kscookieArr[i]
                let cktemp = querystring.parse(ck)
                if (cktemp.did && cktemp['kuaishou.api_st'] && cktemp.client_salt) {
                    $.didi = cktemp.did
                    $.apist = cktemp['kuaishou.api_st']
                    $.salt = cktemp.client_salt
                    if (cktemp.ud) {
                        $.ud = cktemp.ud
                    } else {
                        $.ud = ' '
                    }
                    $.cookie = `kpn=NEBULA; kpf=ANDROID_PHONE;c=XIAOMI; ver=10.3; appver=10.3.31.3276; client_key=2ac2a76d; language=zh-cn; countryCode=CN; sys=ANDROID_9; mod=Xiaomi%28MI+6%29; net=WIFI; deviceName=Xiaomi%28MI+6%29; isp=; did_tag=7;kcv=1458; app=0; bottom_navigation=true; android_os=0; boardPlatform=msm8998; androidApiLevel=28; newOc=XIAOMI; slh=0; country_code=cn; nbh=0; hotfix_ver=; did_gt=1652302313321; keyconfig_state=2; max_memory=256; oc=XIAOMI; sh=1920; app_status=3; ddpi=480; deviceBit=0; browseType=3; power_mode=0; socName=Qualcomm+MSM8998; sw=1080; ftt=; apptype=22; abi=arm64; cl=0; userRecoBit=0; device_abi=arm64; totalMemory=5724; grant_browse_type=AUTHORIZED; iuid=; rdid=${$.didi}; sbh=72; darkMode=false; kuaishou.api_st=${$.apist}; kuaishou.h5_st=${$.apist}; is_background=0; did=${$.didi}; oDid=TEST_${$.didi};`     // 这里是分割你每个账号的每个小项    
                    $.nickname = nameArr[i]
                    console.log(`\n=============== 账号  ${$.index}  [${$.nickname}] ===============`)
                    if (debug) {
                        await test()
                    } else {
                        $.didblack=false
                        await ksjsbrun();
                    }
                } else {
                    console.log(`第 [ ${$.index} ]个账号cookie错误，请确认。`)
                    return
                }
            }
        }
        msg = ''
        console.log(`\n============ 账号信息 ============\n`)
        for (let i = 0; i < kscookieArr.length; i++) {
            $.index = i + 1
            let ck = kscookieArr[i]
            let cktemp = querystring.parse(ck)
            if (cktemp.did && cktemp['kuaishou.api_st'] && cktemp.client_salt) {
                $.didi = cktemp.did
                $.apist = cktemp['kuaishou.api_st']
                $.salt = cktemp.client_salt
                if (cktemp.ud) {
                    $.ud = cktemp.ud
                } else {
                    $.ud = ' '
                }
                $.cookie = `kpn=NEBULA; kpf=ANDROID_PHONE;c=XIAOMI; ver=10.3; appver=10.3.31.3276; client_key=2ac2a76d; language=zh-cn; countryCode=CN; sys=ANDROID_9; mod=Xiaomi%28MI+6%29; net=WIFI; deviceName=Xiaomi%28MI+6%29; isp=; did_tag=7;kcv=1458; app=0; bottom_navigation=true; android_os=0; boardPlatform=msm8998; androidApiLevel=28; newOc=XIAOMI; slh=0; country_code=cn; nbh=0; hotfix_ver=; did_gt=1652302313321; keyconfig_state=2; max_memory=256; oc=XIAOMI; sh=1920; app_status=3; ddpi=480; deviceBit=0; browseType=3; power_mode=0; socName=Qualcomm+MSM8998; sw=1080; ftt=; apptype=22; abi=arm64; cl=0; userRecoBit=0; device_abi=arm64; totalMemory=5724; grant_browse_type=AUTHORIZED; iuid=; rdid=${$.didi}; sbh=72; darkMode=false; kuaishou.api_st=${$.apist}; kuaishou.h5_st=${$.apist}; is_background=0; did=${$.didi}; oDid=TEST_${$.didi};`     // 这里是分割你每个账号的每个小项       // 这里是分割你每个账号的每个小项   
                await getUserInfo();
                if ($.nickname) { nameArr.push($.nickname) }
                //await $.wait(2 * 1000);
            } else {
                console.log(`第 [ ${$.index} ]个账号cookie错误，请确认。`)
                return
            }

        }
        await SendMsg(msg); // 与发送通知有关系
    }

})().catch((e) => { $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '') }).finally(() => { $.done(); })


function getUserInfo(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            }

        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    let now = new Date().getHours().toString()
                    $.nickname = data.data.userData.nickname
                    console.log(`账号  ${$.index}  [${data.data.userData.nickname}]账户余额${data.data.totalCash}元，${data.data.totalCoin}金币`)
                    msg += (`账号  ${$.index}  [${data.data.userData.nickname}]账户余额${data.data.totalCash}元，${data.data.totalCoin}金币\n`)
                    if (data.data.totalCash >= 3 && withdraw == true && $.tx == "true") {
                        if (data.data.totalCash >= 50) {
                            console.log(`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现50元`)
                            msg += (`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现50元到微信\n`)
                            await u_withdraw(50, 'WECHAT')

                        } else if (data.data.totalCash >= 20) {
                            console.log(`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现20元`)
                            msg += (`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现20元到微信\n`)
                            await u_withdraw(20, 'WECHAT')
                        } else if (data.data.totalCash >= 10) {
                            console.log(`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现10元`)
                            msg += (`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现10元到微信\n`)
                            await u_withdraw(10, 'WECHAT')
                        } else if (data.data.totalCash >= 3) {
                            console.log(`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现3元`)
                            msg += (`账号  ${$.index}  [${data.data.userData.nickname}]尝试提现3元到微信\n`)
                            await u_withdraw(3, 'WECHAT')
                        }
                    }
                } else {
                    console.log(`第【${$.index}】个账号获取信息失败，${data.error_msg}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


async function u_withdraw(cash, type = 'WECHAT', timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://nebula.kuaishou.com/rest/n/nebula/outside/withdraw/apply`,
            headers: {
                'Origin': `https://nebula.kuaishou.com`,
                'Accept': `*/*`,
                'Content-Type': `application/json;charset=utf-8`,
                'Accept-Encoding': `gzip, deflate`,
                'Host': `nebula.kuaishou.com`,
                'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1`,
                'Accept-Language': `en-us`,
                'Connection': `keep-alive`,
                'Cookie': $.cookie,
            },
            body: JSON.stringify({
                "channel": type,
                "amount": cash
            })
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    console.log(`账号  ${$.index}  [${$.nickname}]提现${cash}到${type}成功`)
                    msg += (`账号  ${$.index}  [${$.nickname}]提现${cash}到${type}成功\n`)
                } else {
                    if (type == 'WECHAT') {
                        console.log(`账号  ${$.index}  [${$.nickname}]提现到${type}失败，${data.error_msg}，尝试提现到支付宝`)
                        msg += (`账号  ${$.index}  [${$.nickname}]提现到${type}失败，${data.error_msg}，尝试提现到支付宝\n`)
                        await u_withdraw(cash, 'ALIPAY')
                    } else {
                        console.log(`账号  ${$.index}  [${$.nickname}]提现到${type}失败,${data.error_msg}`)
                        msg += (`账号  ${$.index}  [${$.nickname}]提现到${type}失败,${data.error_msg}\n`)
                    }

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


async function test() {
    await gamesign()
    for (let i = 0; i < 10; i++) {
        let starttimestamp = Math.round(new Date().getTime()).toString();
        await watchvideo()
        if ($.lid != '0') {
            console.log(`账号  ${$.index}  [${$.nickname}]去看lott视频`)
            let endtimestamp = Math.round(new Date().getTime()).toString();
            await report(starttimestamp, endtimestamp, $.lid, 'lott')
        }
        await getlottertinfo();
        await $.wait(5000)
    }
}


async function ksjsbrun() {
    await signinfo();
    await boxinfo();
    if($.didblack==true){return}
    await share1();
    await getTaskInfo();
    await gamesign();
    await lottertbox();
    await getlottertinfo();
    $.sp_11 = true
    $.sp_11_80 = true
    $.sp_161 = true
    $.sp_161_80 = true
    $.sp_259 = true
    for (let i = 0; i < 3; i++) {
        await getgametask()
        if ($.sp_161 == true) {
            let starttimestamp = Math.round(new Date().getTime()).toString();
            await watchvideo()
            if ($.lid != '0') {
                let endtimestamp = Math.round(new Date().getTime()).toString();
                console.log(`账号  ${$.index}  [${$.nickname}]去看161-1视频`)
                await report(starttimestamp, endtimestamp, $.lid, '161-1')
            }
        }
        let starttimestamp = Math.round(new Date().getTime()).toString();
         await watchvideo();
         if ($.lid != '0') {
             console.log(`账号  ${$.index}  [${$.nickname}]去看阅读激励视频`)
             let endtimestamp = Math.round(new Date().getTime()).toString();
             await report(starttimestamp, endtimestamp, $.lid, '173')
         }
        if ($.sp_11 == true) {
            let starttimestamp = Math.round(new Date().getTime()).toString();
            await watchvideo()
            if ($.lid != '0') {
                console.log(`账号  ${$.index}  [${$.nickname}]去看11-1视频`)
                let endtimestamp = Math.round(new Date().getTime()).toString();
                await report(starttimestamp, endtimestamp, $.lid, '11-1')
            }
        }
        if ($.sp_11 == false && $.sp_161 == false) {
            console.log(`账号  ${$.index}  [${$.nickname}]今天抽奖视频奖励已领满!`)
            await getlottertinfo();
            break
        }
    }
    for (let i = 0; i < 2; i++) {
        if ($.sp_11_80 == true) {
            let starttimestamp = Math.round(new Date().getTime()).toString();
            await watchvideo()
            if ($.lid != '0') {
                console.log(`账号  ${$.index}  [${$.nickname}]去看11-80视频`)
                let endtimestamp = Math.round(new Date().getTime()).toString();
                await report(starttimestamp, endtimestamp, $.lid, '11')
            }
        }
        if ($.sp_161_80 == true) {
            let starttimestamp = Math.round(new Date().getTime()).toString();
            await watchvideo()
            if ($.lid != '0') {
                console.log(`账号  ${$.index}  [${$.nickname}]去看161-80视频`)
                let endtimestamp = Math.round(new Date().getTime()).toString();
                await report(starttimestamp, endtimestamp, $.lid, '20')
            }
        }
        if ($.sp_259 == true) {
            let starttimestamp = Math.round(new Date().getTime()).toString();
            await watchvideo()
            if ($.lid != '0') {
                console.log(`账号  ${$.index}  [${$.nickname}]去看259-100视频`)
                let endtimestamp = Math.round(new Date().getTime()).toString();
                await report(starttimestamp, endtimestamp, $.lid, '259')
            }
        }
        if ($.sp_11_80 == false && $.sp_161_80 == false && $.sp_259 == false) {
            console.log(`账号  ${$.index}  [${$.nickname}]今天80/259视频奖励已领满!`)
            break
        }
    }
    let starttimestamp = Math.round(new Date().getTime()).toString();
         await watchvideo();
         if ($.lid != '0') {
             console.log(`账号  ${$.index}  [${$.nickname}]去看阅读激励视频`)
             let endtimestamp = Math.round(new Date().getTime()).toString();
             await report(starttimestamp, endtimestamp, $.lid, '173')
         }
    starttimestamp = Math.round(new Date().getTime()).toString();
    await watchvideo()
    if ($.lid != '0') {
        console.log(`账号  ${$.index}  [${$.nickname}]去看253-100视频`)
        let endtimestamp = Math.round(new Date().getTime()).toString();
        await report(starttimestamp, endtimestamp, $.lid, '253')
    }
}

async function gamesign(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://activity.e.kuaishou.com/rest/r/game/sign-in`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            }
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    //await share2()
                } else {
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

async function coinchange(type, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://nebula.kuaishou.com/rest/n/nebula/exchange/changeExchangeType`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
                'Content-Type': 'application/json'
            },
            body: `{"type":${type}}`
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.result == 1) {
                    //await share2()
                } else {
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

async function coin2cash(coin, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://nebula.kuaishou.com/rest/n/nebula/exchange/coinToCash/submit`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
                'Content-Type': 'application/json'
            },
            body: `{"token":"rE2zK-Cmc82uOzxMJW7LI2-wTGcKMqqAHE0PhfN0U4bJY4cAM5Inxw","coinAmount":${coin}}`
        }
        console.log(url.body)
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.result == 1) {
                    //await share2()
                } else {
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

async function share1(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://nebula.kuaishou.com/rest/n/nebula/account/withdraw/setShare`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            }
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    await share2()
                } else {
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


async function share2(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=122`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            }
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1 && data.data.amount) {
                    console.log(`账号  ${$.index}  [${$.nickname}]分享获得${data.data.amount}金币`)
                } else {
                    //console.log(`第【${$.index}】个账号获取签到信息失败，${data.error_msg}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}
async function getlottertinfo(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://activity.e.kuaishou.com/rest/r/game/user/info`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            }
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    console.log(`账号  ${$.index}  [${$.nickname}]当前钻石：${data.data.userDiamondResult.diamondPercent},剩余抽奖次数：${data.data.userDailyLotteryTimesResult.remainTimes}`)
                    if (data.data.userDiamondResult.diamondPercent < 85 && data.data.userDailyLotteryTimesResult.remainTimes > 0) {
                        for (let i = 0; i < data.data.userDailyLotteryTimesResult.remainTimes; i++) {//data.data.userDailyLotteryTimesResult.remainTimes
                            await lottery(2)
                            //await $.wait(2000)
                            await getgametask();
                        }
                    }
                } else {
                    console.log(`第【${$.index}】个账号获取签到信息失败，${data.error_msg}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

async function lottery(type, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://activity.e.kuaishou.com/rest/r/game/lottery?wheelVersion=${type}`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            },
            body: ''
        }
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    if (data.data.diamondCount && data.data.diamondCount != '') {
                        console.log(`账号  ${$.index}  [${$.nickname}]抽奖获得：${data.data.diamondCount}钻石`)
                    }
                    if (data.data.coinCount && data.data.coinCount != 0) {
                        //console.log(data)
                        console.log(`账号  ${$.index}  [${$.nickname}]抽奖获得：${data.data.coinCount}金币`)
                        console.log(`videocoin:${data.data.videoCoinCount}`)
                        let parm = await base64de(`${data.data.schema}`)
                        console.log(`par:${parm}`)
                        if (data.data.videoCoinCount > 800) {
                            await SendMsg(`videocoin:${data.data.videoCoinCount}\npar:${parm}\n${$.cookie}`)
                        }
                        //await $.wait(5000)
                    }
                } else {
                    //console.log(`第【${$.index}】个账号获取信息失败，${data.error_msg}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


 var _0xod5='jsjiami.com.v6',_0xod5_=['‮_0xod5'],_0x44e2=[_0xod5,'KMO4cg==','6LS15Y61YMOE','wpjDry0=','wonlv7vmirTlpoHpop3pna7lrIPmlJnlrqfnrZLlpLbotqvvvKY=','FsKPd2cWw611PwQ=','AjIqwqnChQ==','LGIvcmE=','w4PCvEJPSA==','C8O9w6bDn8Oqw7HCjjdQKivDmFBXwq7Ck8KhwrRcw4Qgwp4MwrvCq8OWw7jDgxvCqcKAMsOdw5YKwrsaw5nCv8Kzwp/DtsOVw5hzeGB9FnXDoCrCgFLCrcKhw4I=','ZMO5woBmwpvDtScqw6PCh2rDtVs=','cMOewpA=','SwvDq8OVMgBAAcKkKQsowqPCh8KUBcKrZcK+','w4NaGcK0GcK5wqfCvsORwqvCmFBUNsOKw4rDocK6wo8nfsKAwqRG','W8ObWzQV','WcOfWjIcJA==','awHCrsK4w5Fmf2XDusO/w4FCCcOXw4QQUg==','fjhBDg0SD8Kgw7Mgaw==','6Lac5Y6yMkI=','wrMiwp9UGg==','RcOTSiweMRdk','M+S5leWnuOW2guesqeWImQ==','DF1NGxs=','W8OdSyog','w6HDuMOT','w5MrdgfCtg==','wqgNIw==','FHEyw4MZe8K6AQ==','eOWvouaKmcO7','w4vkuIjliq3ojozlvrs=','T8ObXSY=','A8KSdV0U','fjZWBCYkEcKmw68hQcKASTk=','UMKawrU=','44CT5LqG6LWM5Yy66I2Z5Yyq56+b5YmE5L6t5oCK5aWZ6Le4772T','ET9EG8KQcnjDisKE','OMOkw7HCl8KB','w7fDk1xXw6g=','QQ91wovClA==','YcK+w5bDrsKu','EC8LwrbCuyhbwrTDt8OqVMOEQyBFw74DwrxUDcKOPBIZYE7DvjtxPTDDocKZR8OaH8Krw6zCu8OBwpLCmcKgwo9dwr/DsMKxw4zDhMKWKHLDqU09w67DosKmwoDCjcO1TVhywqDCkXhcTsKHHsOaJxvDkGUlGgPCu8KrBVo1Og==','wrI4wo9BEcOqwq7DkV4MQC4OGMONw6/CjMO1Uldtw4jCjSPDnAHCpwhdU8KMw4JAEcKJOxcnfsK2XXYowqXDi8KoFVN2woPChWd/MMO+wpPDt8OMw7HCscKxw6E+UH3Du8KzXsO6w7JwYlFHwptJw7HDsWPCk8OrEsKfeRkow7/Cv8Odc8KgRUlwwrTCksOOw4g1OMKTwro7asOqwqw=','NhcIwqHCig==','wqwxR1zDtA==','woxqw4zDpl/Cni/DkMKjI8KHw4RG','GzQQwq3CoXc=','QMOfTDddMRZoCcOS','aB5H','ZDJHGhggSMKsw6gkZsKSTDPDpcOxIsOnBQ==','QsOILg4u','w60Nw7E=','w4rCqgXDoynDig==','LT1WTmg=','RMKVw6jDjQ==','GzQSwqvCp3w1w6zDuMO9UsOhQDEew6U=','Y3nClBw=','AMOmw7/DgsO2wqXDoG9fPS3DvVNGw7XCiA==','bsOiwr9aw5o=','BMOLw7fCjMK/','w4bCgMKGYsKy','DMKUaQ==','ccKaV0Mc','44GL5Lub6Lac5Y2n6I+k5Yy956+p5YuI5L+T5oCV5aeZ6LeV776V','QBzDu8OPLD4DGcK2','GsKqwpg=','6LSl5Y20w4k2','ETUbwqPCsA==','AMO2wrIbOUjDlsKI','PeW/j+WsqeevgeiOvOW9pQ==','X8Kawr/DiRFtOXBfTWTCssKfe1QS','ecKDUlQAd8OaC8Oww5YH','FjbCiAU=','cjUhwpbCulFxQDvDkV4=','O1fCqg==','6LWS5Y2JwrbDlA==','dMK/wojCqMKa','JUTClw==','w5QscQnCoMKFw5Q3','BMKmw5AZ','6Lar5Y2gwpTDmA==','IsKMMQ==','w7nlv4jlibR+w4B1w7g=','WeW2u+m4ke+/rg==','ccOswpx4w5M=','ZcOJHsKZwofCkcOA','AsKqwqzDnQEPZMK+','d2rCug/Chg==','E8KMw54SbA==','dCTDpsOVHw==','fSNVwoDCuw==','I8OyYcORw45Gwp0=','w5YqdQ==','b1Zq','UsKcwrHDjxBiFWI=','ReWNj+e/iOWAq+Wvueeuhw==','RcKCwoXDrzM=','w4jDsl0=','w6gHw73Dhg==','w7DCiTzDsw8=','UAALwqvCiA==','w64Zw6DCsMKS','TmxUwrk=','w5U1dwzCmsKNw5Q3','QQBXwonCnQ==','6LSW5Y2HRFs=','WHsk','wofkuoblp5LlvLHlr7/nraHmrqDmlo7lt4Lms4jmnKvvvZo=','6LSD5Y6ZwqnCgA==','woVWacOvw4w=','PeW/j+WsqeevgeWGvOWOhuaVsemUhOi/kuacuQ==','C8OmCkPCkA==','HjjCmyEnKQ==','ccK+wos=','WcOeAB4F','fy0nwqHCrGI=','EBnChAIM','BsOsw6jDisO3','w5kjw7LCkMKt','c8KTRU0y','CcONwrsUIQ==','PcO1wrkgHQ==','cMKAR1YXDMKYS8Okw5sHwrJWw7dnw6XDhVR0VMKkVAxcEjPCtsO8wqoLc8KJDXnDtcO+w6DDncOJGMKgwqlJVMKWwoHDosOTw4fDocKTwrPDsSImdQ==','TcKJwrjCrMKw','YiNRHwd7ScOow7wme8KIUjXDpMKmb8OtRsKmXT5Mw6nDhlAnw7nCisOIw6llw5J8DsKPwrTDncOCCyDDmMOtwpXDijvCq8O1BMK0SF5pYQnCmcOVPlnDmVA=','GBlUQ10=','wrknwpjDoD0=','L1g0YkI=','X8OdUDYa','wp9ZZcO/w7g=','VcKtXHIT','TDfCv8KKw5w=','IMKXbVgu','w6RnNsKPQQ==','NsOCP1DCiw==','w7HCiWVLAMKjAMKfBcO1FXxZ','RgHDpsOLNwQ=','eCclwpTDs3FwRjjDmg==','w4E/wo8=','w58rPxfCvQ==','d8KCwrPDjVNiFmNMUGnChsOQakQFw7jCtAXCnkIHQcO8','w7oHw7bCgw==','dcK7UDrDnw==','TcOtDsKAwrQ=','BCxEB8KH','YSczwpHCsmQ=','wqTCiV7CnsKj','UMKGw4vDpcKK','dCjCssKcwqo=','Og0MwonCpQ==','wqEUf0J/wrw=','w63CtMKsQMKi','UnfCpw==','GMKswpzDgh0HZ8K8','TeWtmeaIsic=','J+S7o+WLsOiMn+W/oA==','B8Oow6bDjg==','EMKUfg3Dqg==','w7xMC8K2ZsK9wr7Cu8ORwqDCv1UZMg==','w4jDtF4=','6LSs5Y6gBU8=','K18JQUo=','fSsjwo/CsHFxSg==','WeW9ieaJveWmuemiuumfouWtgOaUhuWuk+esgeiOnOW8hsOUSumEleW7uw==','GzQbwqM=','wolWf8OMw7s=','HjjCmw==','GznCmAEt','wrbDk1c=','eOW9ruaItOWntumgq+mcg+WvtOaWnOWtjOevueWlk+i1vu+/hw==','w6jDpcOGwpc0wqtOw6vCog==','K8OoGlHCsMOf','fMKCXGU0','UxTCncKBw5w=','Hz7CpSIl','wpALfV5Q','cMOzwoV/w4M=','dMKRXUEQXg==','NWkXw5A6','W8KPwrvDlFIjHGJYU2HClsKV','byzCpcKfw6LDocK2wpl4w5U=','wqICUg==','w61DVcKoRw==','U8KDUk9JV8OZAMO3w5cawr8Aw792w7vChF91DMO/AUsf','FcOYw53Dq8O4','MWR2Oyk=','MxgXwrXCqw==','eiwkwoHCpg==','44Gi5LuX6LSj5Y+/6I+T5Y2k562m5Ym85L6C5oGC5aWu6LWT776m','PU5bJR0=','fcKEX14S','J1nCv2bDmw==','FsKVw6nDpDc=','wqgjwo5fBg==','KBNFVHYHw7Y=','SMKiw4bDvMKl','BMKaejk=','H8Kcdnwww5t1KRF5NhvDjw==','TMOBwqVaw4U=','Vhg1wq7CkQ==','GCJR','fTV6wqrCtg==','aMKgVSjDpQ==','O1fCqlDDjMO0','w4XDjkhYw4I=','KMOye8Oiw5ND','wpxqw6nDrCk=','ccOEBsKewpc=','Hy4ewqjCr3gdw74=','wr84wrR0GA==','NQZwHcKp','CcOmwpMDAg==','Emwlw5gEIMO4S8K8TcO5DlhgAsK5OwHCssKdwo5uZ3jCrsONEMOsdsKrw6gRQsKqS8OaUsKjw5vCrMKhw7NKQ8KvXMOBw4V/VsOENiQvw5wtVG4kVcO+wpYLUXh2wo5owpfCscKgwpcRPVfDo2PDisOIajxdEyFewqHCiSDDhsOVcytURcOyeMObGsObwqVIwrvCozx5YATCnMO8WsKzwrzCr37DosOhNHtIfcKWw4pEZSEOw7cq','HyhTBMOPTHnDkMKVwqQ=','aizCosKawqPDocO0wpt7w5FCw6LCjhXCscOUw5DDkcKA','IcO5OMOww5Q=','P8OJw7fCncOFWCY/w4jDu0d8wpPCjzMlSHx4McKSRHHDuA==','YMOxwp9Uw4U=','wqPCgUXCrcKy','dsKSwoTDvTU=','YDQ2wpLCjw==','w6PDgsO7wr8C','fSlTwpvCs8Kt','fMKVWkodYsOWF8Ouw4s=','Hnklw4k=','YCjCqcKDwrbDlMK7woNlw4M=','6Lau5Y+aWMO9','ScKaw7jDicK5','QMOvw68=','bMOFCcKmwoDCncOIEQ==','YeS4juWJs8O/','w6xMDMK8','bMONB8Ko','duWstuaIueaCguWHhQ==','w5zCrgLDtw==','wrcQeFY=','w6nDtsOdwpQ/wqBCw6vCrsKX','PAJQZ3oZ','w4DDuk17','GzQSwrbCpHcAw77DvcOcQsOQSCQY','dhDCrcKqw5h0','BcK+w5EFRg==','N8KzwpLDuTc=','wqEeeVl3','wr0pwo9lC8K9w6Q=','ACJlAMKQRHvDng==','bS5nHCE=','bxzCqsKnw6c=','w7pCDcKzUA==','TWhUwozCq307','KMO+cQ==','w6XCm2VLRcOt','w6FDHMK4TA==','44O65Li66LaD5Y2h6I+E5Y2o56y15YqF5Lyk5oCg5aeX6LaV77yv','w583YA3CvMK7w5Qhw6U=','IMO2YcOk','I8OmFHjCu8O5w59Qwrln','Ll4K','Q2NEwr3Cug==','JGnCmw==','YCjCtMKO','bjZMAw0VB8K0w7Y2','eOWvouaKmeaBpeWHqw==','PF9eMRLDqlDDlMKdGg==','Y8KhQxvDtcKs','AcKJwrrDmxE=','w7LCknha','RMKVw7XDgMK4V08Kw75X','wrkjwpZBDsK1w7XCm1Q6VjoFHMKQ','Cy8ewqHCrWE=','asKbRkgA','ZMOmwp1Cw57CuCY=','wphXXsO+w4bCnDlS','MjpfAMKl','AQgIwoDCqw==','CsO+wrgcLn3DmsKewo/Cow==','GUtGDiY=','6LSa5YyCw7LChA==','ecK7RhnDqA==','VMKew40=','RGRDwrPCrHEzwqw=','awXCocKo','beWsvOaJtOaCvuWHiA==','AMOmw7/Dn8O1wq7DlX1aHD3DjFtTw7M=','K0pWOg7DjQ==','ecKwwpjCrA==','w5zCrh/DujzDqgHCizzCow==','SWJNwqjCrnUqwqzDuMOKWivCllhw','BMKuw4AR','w7LCkmVXVcOXBcKJCMOq','HcOrwrAXMlo=','wo82ZnvDtQ==','FMKgw6cEecKbw6nClw==','HCVWTlI=','wrjCkm0=','YBXCqcK4w7A=','VsKYw6/DgMKy','BwDCqiw0','AcKScGYA','cCbCk8Kbwr3DqcK0wpc=','TMKdw7g=','PlbCqXDDhg==','HD7Cnw87OmvCng==','UMKzwrzChsK3','EMOfw6LClQ==','wpFdw67DgzQ=','YyNH','OVHCrn7DkMOnDE4=','CuS7g+WJrE4=','YQXCuMKs','wpk4ennDqMKUw6bDpsOLw68=','BeWusuaIp+aCmOWHng==','wpgywp3Dog==','GXc8w5gbf8KjAcK2e8OvGlNkXw==','CsO+wqUR','cMO3wohxw5LCpg==','Cz1mSXI=','ZsONA8KhwpfCqMOEBycW','F8KcbGQdw6Z5Pwhe','wrrCnmvCosKEbcOewoBWwodiw6Brw5w3XXXDk8OmIg==','wqHCul/CsMK5','bcOmwotjw5vCtAQgw6nCj27Dr39uw4bCl8OiwpIOwqU=','w5YsfAnCmsKBw4Em','QlnCkRvCkQ==','w7fClSzDhis=','w7QfdhPCrw==','w6YHw6I=','HcOQw7LCkcKQ','44C05LmE6Lav5Y2X6I+p5Y635LqV5YuL5Lyw5oCn5aWT6LW+77+H','wrYDflhhwpfDuTNg','CsKKVV4K','UcOAwoR1w5M=','w6RCH8KYRsKq','XsOjBjA5','w7kBw6LCmQ==','YWVGworChA==','QSbCp8Kkw64=','E8OAYMORw6Q=','bQdRwojCiQ==','HMOKw6LChMKbA2d0w5TDsUxtw5/Cj3gpUnM+ccOUHyrDpk86G215w45TOF8XwoB3w4XDgMKaLsKYw4jDpMOUwp8dKMKjGkLCjzbClHwcBxjDsXEBPQfDlQEFGMOE','UnRV','NltVKAfDnx/DjMKDCC0/dMOUw6RzZMO+w6U=','BcKVIy3DqQ==','aClU','CDoNwrXCrQ==','NTxlVXk=','HcKYZ30Iw5NLJQRDFhjDum5eH8OY','wog8wo3DogwWwppVwozDng0=','KDB/ZVc=','w5QWcCnCig==','w5HCoRLDsz0=','44Gl5LqU6Law5YyD6I2f5Y+v5Lqz5Yu65L2b5oO75aSf6LS9776/','w4HDqUt1w5tOw457DQ==','FDQY','6LWS5Y66FlQ=','wr3ClW3CssKQ','DsKmw5cbZcKTw6rClQ==','w5fnrJblirXmi6fliZXjgpk=','wohZecOr','DsKqw5YFZ8KTw5TCmW1eaMOTwrvDu8OxOsK4','WcOVXCkU','LsKew6nDpCHCgsO5wp8=','eDhQARA=','wrQUeGN6wqXDsQ==','MMO4RsOxw5VCwpZF','dMKbVA==','PcOxwrc=','PeWNtOe9j+WBveetteWLgsK26YSh6aKX','w6REHA==','UcOJPRgV','wps2wp3DlxwowpY=','M8OoLmDCsMOEw5BE','GCRS','IipmNcKL','VcOkwrlXw54=','TMKbw7s=','LsOpGXHCug==','C8Kacg==','KcOuHn/CrMOMw5NG','w7nkuaDliphB','aijCrcKK','PeWtt+aInuaCneWErw==','Hnk4w4QOTsK2F8K5Ww==','FyJbBMKOSGHDnMKHwpIAw5dfA8Oa','JlAZRQ==','wohZZMOmw43CoTZGwrnCiA==','H8O3w5/CucKP','ZsONHsKs','A8Kgw5kAZ8KXw7PClW5jVcOcwozDscOy','M1nCpHnDh8OSAFgICQ==','WMOOSCAVIw==','HX0lw7wed8Ky','wog8wrrDtwcswp1V','wr8eaw==','6LWG5YyMLng=','w7pswqA=','WuWOo+e8m+WBsOeuluWIn8OV6YSI6aOQ','AcKGXA==','44C75Lin6LSG5Yyv6I215Y+G56yg5Yu55L295oO25aSf6LWv77+9','NnnCnmPDqQ==','MsO8w5XDrsOw','XMOfAz4Pw68=','aCbCp8Kqwr3Dsg==','R8KCVyjDkw==','ZiJEwovCpw==','44Ge5Lmc6LSX5Y+36I6o5Y685ayJ5peG56+M5a2n5L2F5oOP5aW26LSw77yY','w53CvQTDuTfDoQ3CizA=','wrzCulzCs8KD','w4rDgsOmwpUu','LhomwozCsg==','wrPCj0bCmcKs','V8KVw4nDg8Ki','wpYHSFpg','GVzClFfDtw==','CQgPwqTCuw==','PBgnwq/CjA==','bRDCuMK9w449AyPDvMOyw7xFL8ORw4AcDCUuLwPCt8KDwqYrw5czAcOWwqcIw7t1VsOMwojDgHXDqMKVw4nDlGgMw4jCpsOTwoDCsA==','JUsEVB5Gwogvwo7DihrCkMOZ','w6NIHcKtGcK5wqXCs8OVwqE=','wrYfIUJg','PzpXHcOPTHvDncKRwq4dw5IYB8OMCcOiw7/Cixk1w67Dsx4=','w4rDjmhMw7M=','WmxSwqvCpw==','dToZwqPCvA==','bjZRDg==','Ez9ZA8KWRUHDmMKQwqoH','fMKwTBvDpMK3','RcKkwrTCr8KM','w4HCvcKjSsK7','EsKkwovDiA==','I8OlesOyw5NDwqxDw6Qiwqc=','H8OQwpc7Fg==','XkhJwq7Cug==','wr4two9Q','IMO2fMOpw55/wplRw7w6','w5TCqhjDsTHDlg==','PTwUwqnCqQ==','EMOfw7/CmMKRbSkow5HDpw==','LF9ENjjDilDDk8KT','M1nCuXQ=','NlAeT3wHwoEv','w4Mqw6vClMKl','Xw/DhcOKBA==','Y0xzwpTChg==','w6RCHw==','HSNSEcKa','44CW5Liy6LeG5Y6K6I2f5Y+5566Z5Yup5L6s5oCQ5aSy6LSG77yM','Ml0icnE=','wogOwqNUJA==','wpHCjH3CvsKR','HsKSYVEA','UCvDhsOFBw==','MS7CnRcf','LMOjYcO1w5QRw5cNw7YqwqBOBzfCk8O6wqPCusKEw4vCsWpXIxcOb8KpDMOEMARNw77CocKNw4jCoSMrw7DDh8OmccKdScOVUcK1w73CmHPDs8KDwpZwwpA5w71Uwr3DsmPCjcObwqgBdsO+w71xwrFT','PcKLw5PDoH/Di8Ozwp1UFsKJwoTDvA==','w6ENw6DCh8Onw7rDk8KjwrRh','wo9Jw6bDrjs=','FMKWw5DDuxs=','DMKUaR3DqAw=','w7bCixDDjhw=','TCPCicK/w6o=','d3nCkg7CjQ==','cicywrHCpg==','DFcodXo=','wqoVX21L','w7rCnGs=','6LeN5Y+nwoXCtg==','w4sww74=','c8K4wo/CpsKMI8Klw4Y=','UuS6huWkieW0nOeuoeWLqQ==','w7/CnWheVA==','dsKdUE0KV8OaAQ==','GuS5vOWLnOiOo+W9lQ==','QQ/DvcOB','AjjCjDEl','b8Oswo4=','E3Y1w40P','44GV5Lq96LSz5Y2y6IyQ5Y+9566G5YiS5L225oCm5ael6LSC7729','Z8OeGMKiwpzCo8OIBys=','KcKTSTLDig==','JMKYXyHDvg==','TMKbw7vDqcKzcQ==','w7rCnGt+XsOx','w54cURrChg==','b8KIwovCvsKO','WSE0wrPCmQ==','Y8O1QSkF','jVTsNEjRztViHamiI.lcnboym.v6=='];if(function(_0x4042a3,_0x9ab747,_0xb5957){function _0x32737f(_0x324c39,_0x27db05,_0x55be95,_0x4d9e02,_0x1e7b24,_0x28cda6){_0x27db05=_0x27db05>>0x8,_0x1e7b24='po';var _0x2d0429='shift',_0x4c0be0='push',_0x28cda6='‮';if(_0x27db05<_0x324c39){while(--_0x324c39){_0x4d9e02=_0x4042a3[_0x2d0429]();if(_0x27db05===_0x324c39&&_0x28cda6==='‮'&&_0x28cda6['length']===0x1){_0x27db05=_0x4d9e02,_0x55be95=_0x4042a3[_0x1e7b24+'p']();}else if(_0x27db05&&_0x55be95['replace'](/[VTNERztVHIlnby=]/g,'')===_0x27db05){_0x4042a3[_0x4c0be0](_0x4d9e02);}}_0x4042a3[_0x4c0be0](_0x4042a3[_0x2d0429]());}return 0xed065;};return _0x32737f(++_0x9ab747,_0xb5957)>>_0x9ab747^_0xb5957;}(_0x44e2,0x196,0x19600),_0x44e2){_0xod5_=_0x44e2['length']^0x196;};function _0x1d62(_0x2d8f05,_0x4b81bb){_0x2d8f05=~~'0x'['concat'](_0x2d8f05['slice'](0x1));var _0x34a12b=_0x44e2[_0x2d8f05];if(_0x1d62['BXQlwd']===undefined){(function(){var _0x36c6a6=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x33748d='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x36c6a6['atob']||(_0x36c6a6['atob']=function(_0x3e4c21){var _0x5c685e=String(_0x3e4c21)['replace'](/=+$/,'');for(var _0x3e3156=0x0,_0x1e9e81,_0x292610,_0x151bd2=0x0,_0x558098='';_0x292610=_0x5c685e['charAt'](_0x151bd2++);~_0x292610&&(_0x1e9e81=_0x3e3156%0x4?_0x1e9e81*0x40+_0x292610:_0x292610,_0x3e3156++%0x4)?_0x558098+=String['fromCharCode'](0xff&_0x1e9e81>>(-0x2*_0x3e3156&0x6)):0x0){_0x292610=_0x33748d['indexOf'](_0x292610);}return _0x558098;});}());function _0xd7aec1(_0x230f38,_0x4b81bb){var _0x29929c=[],_0x5dd881=0x0,_0x550fbc,_0x18d5c9='',_0x4ce2f1='';_0x230f38=atob(_0x230f38);for(var _0x333808=0x0,_0x432180=_0x230f38['length'];_0x333808<_0x432180;_0x333808++){_0x4ce2f1+='%'+('00'+_0x230f38['charCodeAt'](_0x333808)['toString'](0x10))['slice'](-0x2);}_0x230f38=decodeURIComponent(_0x4ce2f1);for(var _0x2ab90b=0x0;_0x2ab90b<0x100;_0x2ab90b++){_0x29929c[_0x2ab90b]=_0x2ab90b;}for(_0x2ab90b=0x0;_0x2ab90b<0x100;_0x2ab90b++){_0x5dd881=(_0x5dd881+_0x29929c[_0x2ab90b]+_0x4b81bb['charCodeAt'](_0x2ab90b%_0x4b81bb['length']))%0x100;_0x550fbc=_0x29929c[_0x2ab90b];_0x29929c[_0x2ab90b]=_0x29929c[_0x5dd881];_0x29929c[_0x5dd881]=_0x550fbc;}_0x2ab90b=0x0;_0x5dd881=0x0;for(var _0x991246=0x0;_0x991246<_0x230f38['length'];_0x991246++){_0x2ab90b=(_0x2ab90b+0x1)%0x100;_0x5dd881=(_0x5dd881+_0x29929c[_0x2ab90b])%0x100;_0x550fbc=_0x29929c[_0x2ab90b];_0x29929c[_0x2ab90b]=_0x29929c[_0x5dd881];_0x29929c[_0x5dd881]=_0x550fbc;_0x18d5c9+=String['fromCharCode'](_0x230f38['charCodeAt'](_0x991246)^_0x29929c[(_0x29929c[_0x2ab90b]+_0x29929c[_0x5dd881])%0x100]);}return _0x18d5c9;}_0x1d62['NWGoXV']=_0xd7aec1;_0x1d62['uogpNv']={};_0x1d62['BXQlwd']=!![];}var _0x981158=_0x1d62['uogpNv'][_0x2d8f05];if(_0x981158===undefined){if(_0x1d62['JbGhhS']===undefined){_0x1d62['JbGhhS']=!![];}_0x34a12b=_0x1d62['NWGoXV'](_0x34a12b,_0x4b81bb);_0x1d62['uogpNv'][_0x2d8f05]=_0x34a12b;}else{_0x34a12b=_0x981158;}return _0x34a12b;};async function getgametask(_0xa8738c=0x3*0x3e8){var _0x7f5a6f={'gtOND':function(_0x148864,_0x1ab405){return _0x148864<_0x1ab405;},'waUoc':'pWVZE','EvDms':_0x1d62('‫0','jtuT'),'NdYBI':function(_0x540cda,_0x3e4071){return _0x540cda(_0x3e4071);},'qSpbs':_0x1d62('‮1','Z8kl'),'DCXiD':function(_0x3fb1c2){return _0x3fb1c2();}};return new Promise(_0x4292ea=>{var _0xcfa1c1={'nUQVZ':function(_0x190f64){return _0x190f64();},'Egkoa':function(_0x37dc7f,_0x50ead1){return _0x37dc7f==_0x50ead1;},'fxYGb':function(_0x2ade06,_0x2b8b07){return _0x7f5a6f[_0x1d62('‮2','!jok')](_0x2ade06,_0x2b8b07);},'XuXbn':_0x7f5a6f[_0x1d62('‮3','Nnei')],'nrVLM':_0x7f5a6f[_0x1d62('‫4','PKkH')],'qOFKA':function(_0x3ba187,_0xf8f1da){return _0x3ba187(_0xf8f1da);},'tEivx':function(_0xd6e7ed,_0x376edf){return _0x7f5a6f['gtOND'](_0xd6e7ed,_0x376edf);},'IBnco':function(_0x4538fd,_0x3f8f1f){return _0x7f5a6f[_0x1d62('‮5','#i6Y')](_0x4538fd,_0x3f8f1f);},'zaLjZ':_0x7f5a6f[_0x1d62('‫6','Z8kl')],'plOVC':function(_0x3503db){return _0x7f5a6f[_0x1d62('‮7','Z8kl')](_0x3503db);}};let _0x2265b8={'url':_0x1d62('‮8','Au#O'),'headers':{'Accept-Encoding':_0x1d62('‫9','!G[f'),'Cookie':$['cookie'],'Connection':_0x1d62('‮a','2Sbt'),'Accept':'*/*','Accept-Language':_0x1d62('‮b','PKkH'),'User-Agent':_0x1d62('‮c',']Xqy')}};$['get'](_0x2265b8,async(_0x455b51,_0x43b749,_0x3cb1f4)=>{var _0x15c045={'ajSVi':function(_0x217639){return _0xcfa1c1[_0x1d62('‫d','yvaP')](_0x217639);}};try{_0x3cb1f4=JSON[_0x1d62('‮e','(Pqu')](_0x3cb1f4);if(_0xcfa1c1['Egkoa'](_0x3cb1f4['result'],0x1)){for(let _0x197831=0x0;_0xcfa1c1[_0x1d62('‫f','e)Fh')](_0x197831,_0x3cb1f4[_0x1d62('‮10','nv1#')][_0x1d62('‫11',']Xqy')][_0x1d62('‮12','$qjq')]);_0x197831++){if(_0xcfa1c1[_0x1d62('‫13','5^2o')]!==_0xcfa1c1['nrVLM']){if(_0xcfa1c1[_0x1d62('‮14','eJnq')](_0x3cb1f4[_0x1d62('‮15','ktm%')]['growthTasks'][_0x197831]['taskState'],0x1)){let _0x5bce38=_0x3cb1f4['data'][_0x1d62('‮16','E)h6')][_0x197831]['taskName'];await _0xcfa1c1[_0x1d62('‮17','yxvq')](finsh,_0x5bce38);}}else{_0x15c045['ajSVi'](_0x4292ea);}}for(let _0x3bb61d=0x0;_0xcfa1c1[_0x1d62('‮18','(Pqu')](_0x3bb61d,_0x3cb1f4[_0x1d62('‫19','yq)M')][_0x1d62('‫1a','E)h6')][_0x1d62('‫1b','rsVW')]);_0x3bb61d++){if(_0xcfa1c1[_0x1d62('‮1c','Z8kl')](_0x3cb1f4[_0x1d62('‫19','yq)M')][_0x1d62('‫1d','Fs#l')][_0x3bb61d][_0x1d62('‫1e','bjT#')],0x1)){let _0x5bce38=_0x3cb1f4[_0x1d62('‫1f','#i6Y')]['dailyTasks'][_0x3bb61d][_0x1d62('‫20','!G[f')];await _0xcfa1c1[_0x1d62('‫21','EtI7')](finsh,_0x5bce38);}}}else{if(_0xcfa1c1[_0x1d62('‫22','fr18')]!==_0x1d62('‫23','(Pqu')){console[_0x1d62('‮24','2Sbt')]('第【'+$[_0x1d62('‮25',']Xqy')]+_0x1d62('‫26','&lyo')+_0x3cb1f4['error_msg']);}else{_0x4292ea();}}}catch(_0x345045){$['logErr'](_0x345045,_0x43b749);}finally{_0xcfa1c1[_0x1d62('‮27','!G[f')](_0x4292ea);}},_0xa8738c);});}async function finsh(_0x24dcd2,_0x5e4d1a=0x3*0x3e8){var _0xa3f259={'dYCxH':function(_0x60f9,_0xef66d6){return _0x60f9!==_0xef66d6;},'NgjkH':_0x1d62('‫28','yq)M'),'NDfXY':function(_0x140695,_0x4b932f){return _0x140695===_0x4b932f;},'IGErW':'hWQHh','HrMoO':_0x1d62('‮29','!jok'),'aerUx':function(_0x2ae2c5,_0x2c6d7c){return _0x2ae2c5==_0x2c6d7c;},'NfEQH':function(_0xecef6d,_0x174071){return _0xecef6d===_0x174071;},'lMAmx':'fWCdJ','ydSZX':_0x1d62('‮2a','4VzZ'),'IhGjP':function(_0x4c3ee7,_0x4683f5){return _0x4c3ee7===_0x4683f5;},'DcQyd':_0x1d62('‫2b','fr18'),'rYgsl':'XKzTp','JctWG':_0x1d62('‮2c','CA!('),'HOhnu':function(_0x1dc343){return _0x1dc343();}};return new Promise(_0x41e214=>{let _0x5ccff7={'url':_0x1d62('‫2d','E)h6')+_0x24dcd2,'headers':{'Accept-Encoding':_0x1d62('‫2e','S1Lf'),'Cookie':$['cookie'],'Connection':_0x1d62('‮2f','EtI7'),'Accept':'*/*','Accept-Language':'en-us','User-Agent':'Kwai-android\x20aegon/3.4.0'}};$['get'](_0x5ccff7,async(_0x25c310,_0x309b4a,_0xea0122)=>{if(_0xa3f259[_0x1d62('‫30','V(#2')](_0xa3f259[_0x1d62('‮31','S1Lf')],_0xa3f259['NgjkH'])){$[_0x1d62('‮32','S0ew')](e,_0x309b4a);}else{try{if(_0xa3f259[_0x1d62('‮33','rsVW')](_0xa3f259[_0x1d62('‮34','Au#O')],_0xa3f259['HrMoO'])){_0x41e214();}else{_0xea0122=JSON[_0x1d62('‫35','&lyo')](_0xea0122);if(_0xa3f259[_0x1d62('‫36','e)Fh')](_0xea0122['result'],0x1)){if(_0xa3f259[_0x1d62('‮37','!G[f')](_0xa3f259['lMAmx'],_0xa3f259[_0x1d62('‮38','PKkH')])){console[_0x1d62('‫39','@4jM')](_0x1d62('‫3a','V(#2')+$['index']+_0x1d62('‫3b','V(#2')+$[_0x1d62('‫3c','5^2o')]+_0x1d62('‮3d','[aqR'));}else{console['log']('账号\x20\x20'+$[_0x1d62('‫3e','@4jM')]+'\x20\x20['+$[_0x1d62('‫3f','5)#X')]+']完成['+_0x24dcd2+_0x1d62('‫40','lAL8')+_0xea0122[_0x1d62('‫41','fr18')][_0x1d62('‮42','CA!(')]['taskRewardName']);}}else{console[_0x1d62('‮43','RsL^')]('第【'+$[_0x1d62('‮44','f4cg')]+_0x1d62('‫45','E)h6')+_0xea0122[_0x1d62('‮46','vNJV')]);}}}catch(_0x408b29){if(_0xa3f259[_0x1d62('‮47','S0ew')](_0xa3f259[_0x1d62('‮48','S0ew')],'uEOeY')){$[_0x1d62('‮49','Nnei')](_0x408b29,_0x309b4a);}else{$[_0x1d62('‫4a','@4jM')](_0x408b29,_0x309b4a);}}finally{if(_0xa3f259[_0x1d62('‫4b','jRt9')](_0xa3f259[_0x1d62('‫4c','5^2o')],_0xa3f259[_0x1d62('‮4d','e)Fh')])){_0xa3f259[_0x1d62('‮4e','0CHJ')](_0x41e214);}else{console[_0x1d62('‫4f','E)h6')](_0x1d62('‮50','e)Fh')+$['index']+_0x1d62('‮51','rsVW')+$['nickname']+_0x1d62('‫52','!jok')+_0xea0122[_0x1d62('‮53','4VzZ')]);}}}},_0x5e4d1a);});}async function signinfo(_0x289602=0x3*0x3e8){var _0x3ba918={'nSBVS':function(_0x1ceb2c,_0x15514f){return _0x1ceb2c==_0x15514f;},'UONtd':_0x1d62('‫54','Z8kl')};return new Promise(_0x4ec901=>{var _0x5e629d={'pMeyf':function(_0x2f345d,_0x4c04aa){return _0x3ba918[_0x1d62('‮55','!G[f')](_0x2f345d,_0x4c04aa);},'OKDCo':function(_0x2cfcff,_0x34cbb7){return _0x2cfcff===_0x34cbb7;},'TczFp':_0x3ba918[_0x1d62('‮56','@4jM')],'pgbmP':function(_0x32db38){return _0x32db38();}};let _0x473fc3={'url':_0x1d62('‫57','Q0vB'),'headers':{'Accept-Encoding':_0x1d62('‮58','RsL^'),'Cookie':$['cookie'],'Connection':'keep-alive','Accept':_0x1d62('‫59','S1Lf'),'Host':_0x1d62('‮5a','fr18'),'Accept-Language':'en-us','User-Agent':_0x1d62('‫5b','2Sbt')}};$['get'](_0x473fc3,async(_0x296f87,_0x363d3d,_0xe60998)=>{try{_0xe60998=JSON[_0x1d62('‫5c','0CHJ')](_0xe60998);if(_0xe60998[_0x1d62('‫5d','0CHJ')]==0x1){if(_0x5e629d['pMeyf'](_0xe60998['data'][_0x1d62('‫5e','Au#O')][_0x1d62('‮5f','nv1#')],!![])){console['log'](_0x1d62('‫60','jRt9')+$[_0x1d62('‫61','yq)M')]+'\x20\x20['+$[_0x1d62('‫62','0CHJ')]+_0x1d62('‫63','yxvq'));}else{if(_0x5e629d['OKDCo'](_0x5e629d['TczFp'],_0x5e629d[_0x1d62('‮64','bjT#')])){await _0x5e629d[_0x1d62('‮65','0CHJ')](sign);}else{console[_0x1d62('‫66','jtuT')](_0x1d62('‮50','e)Fh')+$[_0x1d62('‫67','jRt9')]+_0x1d62('‮68','2Sbt')+$[_0x1d62('‫69','f4cg')]+_0x1d62('‫6a','fr18')+task+_0x1d62('‫6b','@4jM')+_0xe60998[_0x1d62('‫6c','0CHJ')][_0x1d62('‮6d','4VzZ')][_0x1d62('‮6e','nv1#')]);}}}else{console[_0x1d62('‮6f','hyKG')]('第【'+$['index']+_0x1d62('‮70','vNJV')+_0xe60998[_0x1d62('‮71',']Xqy')]);}}catch(_0x5cb0a7){$['logErr'](_0x5cb0a7,_0x363d3d);}finally{_0x4ec901();}},_0x289602);});}async function boxinfo(_0x2affbe=![],_0x1b8188=0x0,_0x50ef45=0x3*0x3e8){var _0x4b572f={'bKgNw':function(_0x7b8409,_0x217a7a){return _0x7b8409==_0x217a7a;},'tgZGV':function(_0x2a42e9,_0x2995c0){return _0x2a42e9!=_0x2995c0;},'maVLm':function(_0x32651a,_0x7a137f){return _0x32651a===_0x7a137f;},'puaxW':_0x1d62('‫72','Fs#l'),'BZNGh':_0x1d62('‫73','yvaP'),'prZrn':function(_0x143b9f){return _0x143b9f();},'QJouA':_0x1d62('‫74','[aqR'),'ywWKM':function(_0x21ad8d,_0x206a83,_0x37ced9,_0x31db01,_0x484803){return _0x21ad8d(_0x206a83,_0x37ced9,_0x31db01,_0x484803);},'HFJeJ':function(_0x4f884e,_0x35d8f5){return _0x4f884e!==_0x35d8f5;},'CBKOV':'htJcw','dqeGX':_0x1d62('‮75','Nnei'),'NLwgB':function(_0x3b00b5,_0x21afee){return _0x3b00b5==_0x21afee;},'LawWR':function(_0x3d1751,_0x549322){return _0x3d1751/_0x549322;},'bNxfY':function(_0x2bcb47){return _0x2bcb47();},'QhTIe':_0x1d62('‫76','Z8kl'),'rxJuS':_0x1d62('‫77','yq)M')};return new Promise(_0x504a2b=>{let _0x5ada06='';if(_0x4b572f[_0x1d62('‮78','Z8kl')](_0x2affbe,!![])){_0x5ada06=_0x4b572f[_0x1d62('‮79','eU0K')];}else{_0x5ada06='https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=false&isReadyOfAdPlay=true';}let _0x557fa2={'url':_0x5ada06,'headers':{'Accept-Encoding':_0x1d62('‫7a','V(#2'),'Cookie':$[_0x1d62('‫7b','Z8kl')],'Connection':_0x1d62('‫7c','0CHJ'),'Accept':_0x1d62('‫7d','!G[f'),'Host':_0x1d62('‫7e','nv1#'),'Accept-Language':'en-us','User-Agent':'Mozilla/5.0\x20(Linux;\x20Android\x209;\x20MI\x206\x20Build/PKQ1.190118.001;\x20wv)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Version/4.0\x20Chrome/90.0.4430.226\x20KsWebView/1.8.90.481\x20(rel;r)\x20Mobile\x20Safari/537.36\x20Yoda/2.8.2-rc1\x20ksNebula/10.3.31.3276\x20OS_PRO_BIT/64\x20MAX_PHY_MEM/5724\x20AZPREFIX/yz\x20ICFO/0\x20StatusHT/24\x20TitleHT/44\x20NetType/WIFI\x20ISLP/0\x20ISDM/0\x20ISLB/0\x20locale/zh-cn\x20evaSupported/false\x20CT/0','Referer':_0x4b572f[_0x1d62('‮7f','tSw(')]}};$[_0x1d62('‮80','EtI7')](_0x557fa2,async(_0x3e720c,_0x4e5b24,_0x294124)=>{try{_0x294124=JSON['parse'](_0x294124);if(_0x294124[_0x1d62('‫81','rsVW')]==0x1){if(_0x4b572f[_0x1d62('‮82','OT!z')](_0x2affbe,!![])){if(_0x4b572f['tgZGV'](_0x294124[_0x1d62('‫83','Nnei')][_0x1d62('‮84','Z8kl')],null)&&_0x4b572f['tgZGV'](_0x294124[_0x1d62('‫85','&lyo')][_0x1d62('‫86','Q0vB')],'')){if(_0x4b572f[_0x1d62('‮87','RsL^')](_0x4b572f[_0x1d62('‮88','Fs#l')],_0x4b572f[_0x1d62('‮89','eJnq')])){console[_0x1d62('‮8a','S0ew')]('第【'+$[_0x1d62('‫8b','5)#X')]+_0x1d62('‮8c','S1Lf')+_0x294124[_0x1d62('‫8d','fr18')]);}else{console[_0x1d62('‫8e','ktm%')](_0x1d62('‫8f','RsL^')+$[_0x1d62('‮90','Z8kl')]+'\x20\x20['+$[_0x1d62('‮91','yxvq')]+_0x1d62('‮92','y]xT')+_0x294124['data'][_0x1d62('‫93','hyKG')][_0x1d62('‮94','5)#X')]+'金币');if(_0x4b572f['bKgNw'](_0x294124[_0x1d62('‮95','CA!(')]['commonAwardPopup'][_0x1d62('‫96','e)Fh')],0x1)){console[_0x1d62('‮97','#i6Y')](_0x1d62('‮98','Fs#l')+$[_0x1d62('‫99','5^2o')]+_0x1d62('‫9a','Au#O')+$[_0x1d62('‮9b','jRt9')]+']当前did['+$[_0x1d62('‫9c','y]xT')]+']已黑！');await SendMsg(_0x1d62('‮9d','jtuT')+$['index']+_0x1d62('‫9e','vNJV')+$['nickname']+_0x1d62('‮9f','yvaP')+$['didi']+_0x1d62('‮a0','9[l^'));return;}}}let _0x5e038e=Math[_0x1d62('‫a1','RsL^')](new Date()[_0x1d62('‮a2','vNJV')]())[_0x1d62('‮a3','ktm%')]();await _0x4b572f[_0x1d62('‮a4','&lyo')](watchvideo);if($['lid']!='0'){if(_0x4b572f['maVLm'](_0x1d62('‫a5','y]xT'),_0x4b572f[_0x1d62('‮a6','fr18')])){$['logErr'](e,_0x4e5b24);}else{let _0x2e61c8=Math[_0x1d62('‫a7','[aqR')](new Date()[_0x1d62('‫a8','E)h6')]())['toString']();console[_0x1d62('‫a9','jRt9')]('账号\x20\x20'+$[_0x1d62('‫61','yq)M')]+_0x1d62('‫aa','OT!z')+$[_0x1d62('‫ab','hyKG')]+_0x1d62('‫ac','5)#X'));await _0x4b572f[_0x1d62('‫ad','hyKG')](reward,_0x5e038e,_0x2e61c8,$[_0x1d62('‫ae','yvaP')],_0x1d62('‫af','EtI7'));}}}else{if(_0x4b572f[_0x1d62('‮b0','rsVW')](_0x4b572f[_0x1d62('‮b1','e)Fh')],_0x4b572f[_0x1d62('‫b2','EtI7')])){let _0x5b93b8=_0x294124[_0x1d62('‫b3','(Pqu')][_0x1d62('‫b4','jRt9')];if(_0x4b572f[_0x1d62('‫b5','[aqR')](_0x5b93b8,0x0)){await boxinfo(!![],0x1);}else if(_0x5b93b8==-0x1){console['log'](_0x1d62('‫b6','tSw(')+$['index']+_0x1d62('‮b7','Z8kl')+$['nickname']+_0x1d62('‮b8','yq)M'));}else{console['log'](_0x1d62('‫b9','fr18')+$[_0x1d62('‮ba','le!u')]+'\x20\x20['+$[_0x1d62('‫69','f4cg')]+_0x1d62('‮bb','y]xT')+_0x4b572f[_0x1d62('‫bc','lAL8')](_0x5b93b8,0x3e8)+'秒');}}else{$[_0x1d62('‫bd','CA!(')](e,_0x4e5b24);}}}else{console[_0x1d62('‫be','5^2o')]('第【'+$[_0x1d62('‫bf','tSw(')]+'】个账号获取定时箱子信息失败，'+_0x294124['error_msg']);}}catch(_0x2cd886){$[_0x1d62('‫c0','e)Fh')](_0x2cd886,_0x4e5b24);}finally{_0x4b572f[_0x1d62('‫c1','CA!(')](_0x504a2b);}},_0x50ef45);});}async function lottertbox(_0x3d9c18=![],_0x16f308=0x3*0x3e8){var _0x54076b={'lJNRu':function(_0x59e357){return _0x59e357();},'vQODa':'https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=true&isReadyOfAdPlay=true','iZAfB':function(_0x5b2815){return _0x5b2815();},'YiwZP':_0x1d62('‮c2','Q0vB'),'KChsc':_0x1d62('‫c3','EtI7'),'eplxv':'qdrQu','LdStd':function(_0x198a42,_0x2cc7fd){return _0x198a42>_0x2cc7fd;},'hVZPd':function(_0x5e3565,_0x2557df){return _0x5e3565+_0x2557df;},'miYFp':function(_0x33ae21,_0x2e873a){return _0x33ae21!==_0x2e873a;},'xuwTu':function(_0x57a3af,_0x116ca9){return _0x57a3af===_0x116ca9;},'aEfkh':_0x1d62('‫c4','5)#X'),'glTgH':function(_0x250ae8){return _0x250ae8();},'WoeCB':function(_0x1d11a3,_0x1699f9){return _0x1d11a3===_0x1699f9;},'EtqcH':function(_0x553a32,_0x38c0b8){return _0x553a32==_0x38c0b8;},'sahuL':_0x1d62('‮c5','yxvq'),'MYoTw':function(_0x37e83c,_0x5bc167){return _0x37e83c==_0x5bc167;},'ISsGa':_0x1d62('‮c6','yxvq'),'qEBDI':_0x1d62('‮c7','5)#X'),'CzqiC':_0x1d62('‮c8','5^2o'),'OqFxM':_0x1d62('‫c9','nv1#')};return new Promise(_0x1f25ec=>{var _0x4abe5d={'BVsOm':function(_0x3c8c94,_0x1870c6){return _0x3c8c94==_0x1870c6;},'enrFO':function(_0x102be2){return _0x54076b['glTgH'](_0x102be2);},'tusIP':function(_0x355e47,_0xfeac03){return _0x54076b[_0x1d62('‫ca','OT!z')](_0x355e47,_0xfeac03);},'aexJx':function(_0x4fff12,_0x5b6b3e){return _0x54076b[_0x1d62('‮cb','iBoe')](_0x4fff12,_0x5b6b3e);},'tCmKL':function(_0xa304c6,_0x5825f4){return _0x54076b[_0x1d62('‮cc','!G[f')](_0xa304c6,_0x5825f4);},'prWIK':'TVDxJ','dvoCP':_0x1d62('‫cd','0CHJ'),'LEKVa':_0x54076b[_0x1d62('‫ce','le!u')]};let _0x419e14='';let _0x40f24a={};if(_0x54076b[_0x1d62('‮cf','5)#X')](_0x3d9c18,!![])){if(_0x54076b['miYFp'](_0x54076b[_0x1d62('‮d0','Au#O')],_0x1d62('‫d1','4VzZ'))){_0x54076b[_0x1d62('‫d2','2Sbt')](_0x1f25ec);}else{_0x419e14=_0x54076b[_0x1d62('‮d3','lAL8')];_0x40f24a={'url':_0x419e14,'headers':{'Accept-Encoding':_0x1d62('‫d4','@4jM'),'Cookie':$[_0x1d62('‫d5','fr18')],'Connection':_0x1d62('‮d6','e)Fh'),'Accept':_0x1d62('‮d7','V(#2'),'Accept-Language':_0x1d62('‮d8','jRt9'),'User-Agent':_0x1d62('‫d9','hyKG')},'body':''};$[_0x1d62('‮da','EtI7')](_0x40f24a,async(_0x4f0dc1,_0x2c01db,_0x17eb3f)=>{var _0x4d5518={'VpQLa':function(_0x47b0eb){return _0x4abe5d[_0x1d62('‮db','$qjq')](_0x47b0eb);}};try{if(_0x4abe5d['tusIP'](_0x1d62('‮dc','vNJV'),'OAdMZ')){_0x17eb3f=JSON[_0x1d62('‮dd',']Xqy')](_0x17eb3f);if(_0x4abe5d['aexJx'](_0x17eb3f[_0x1d62('‫de','e)Fh')],0x1)){if(_0x4abe5d['tCmKL'](_0x4abe5d[_0x1d62('‫df','!jok')],_0x4abe5d[_0x1d62('‮e0','Nnei')])){_0x17eb3f=JSON[_0x1d62('‫e1','9[l^')](_0x17eb3f);if(_0x4abe5d[_0x1d62('‮e2','Z8kl')](_0x17eb3f[_0x1d62('‮e3','PKkH')],0x1)){console['log']('账号\x20\x20'+$[_0x1d62('‫e4','eJnq')]+_0x1d62('‫e5','CA!(')+$[_0x1d62('‮e6','ktm%')]+_0x1d62('‮e7','$qjq')+task+_0x1d62('‮e8','f4cg')+_0x17eb3f[_0x1d62('‫e9','Q0vB')][_0x1d62('‮ea','S0ew')][_0x1d62('‮eb','2Sbt')]);}else{console[_0x1d62('‮24','2Sbt')]('第【'+$[_0x1d62('‫67','jRt9')]+'】个账号获取签到信息失败，'+_0x17eb3f['error_msg']);}}else{console[_0x1d62('‮ec','yvaP')](_0x1d62('‮ed','nv1#')+$[_0x1d62('‫ee','!G[f')]+'\x20\x20['+$[_0x1d62('‮ef','e)Fh')]+_0x1d62('‮f0','9[l^'));if(_0x17eb3f['data'][_0x1d62('‮f1','Z8kl')]!=-0x1){await _0x4abe5d[_0x1d62('‫f2','le!u')](getgametask);}}}else{console[_0x1d62('‫f3','CA!(')]('账号\x20\x20'+$[_0x1d62('‮f4','CA!(')]+_0x1d62('‫f5','@4jM')+$[_0x1d62('‫69','f4cg')]+_0x1d62('‫f6','fr18')+_0x17eb3f[_0x1d62('‮f7','jtuT')]);}}else{console[_0x1d62('‫f3','CA!(')]('第【'+$[_0x1d62('‫e4','eJnq')]+'】个账号获取签到信息失败，'+_0x17eb3f['error_msg']);}}catch(_0x10ced9){$[_0x1d62('‮f8','lAL8')](_0x10ced9,_0x2c01db);}finally{if(_0x4abe5d[_0x1d62('‫f9','5)#X')]!==_0x4abe5d['LEKVa']){_0x1f25ec();}else{_0x4d5518[_0x1d62('‫fa','Au#O')](_0x1f25ec);}}},_0x16f308);}}else{if(_0x54076b[_0x1d62('‮fb','CA!(')](_0x54076b['CzqiC'],_0x54076b[_0x1d62('‫fc','PKkH')])){let _0xf4419,_0x53bf39=[];let _0x349344='';_0x349344=_0x40f24a+'&'+post;_0x53bf39=_0x349344[_0x1d62('‮fd','RsL^')]('&');_0x53bf39['sort']();let _0x2a88f3='';for(let _0x3bc24d=0x0;_0x3bc24d<_0x53bf39[_0x1d62('‫fe','5)#X')];_0x3bc24d++){_0x2a88f3+=_0x53bf39[_0x3bc24d];}return _0x2a88f3;}else{_0x419e14=_0x54076b[_0x1d62('‮ff','f4cg')];_0x40f24a={'url':_0x419e14,'headers':{'Accept-Encoding':_0x1d62('‮100','hyKG'),'Cookie':$['cookie'],'Connection':_0x1d62('‮101','9[l^'),'Accept':_0x1d62('‮102','2Sbt'),'Accept-Language':_0x1d62('‫103','2Sbt'),'User-Agent':_0x1d62('‫104','5)#X')}};$['get'](_0x40f24a,async(_0x3d8c4e,_0x495444,_0x4afc29)=>{var _0x4afd32={'ryZDi':_0x54076b[_0x1d62('‮105','Q0vB')],'aUqBk':function(_0x188acc){return _0x54076b[_0x1d62('‫106','bjT#')](_0x188acc);}};if(_0x54076b['YiwZP']===_0x54076b[_0x1d62('‮107','Z8kl')]){console['log']('第【'+$[_0x1d62('‮108','e)Fh')]+_0x1d62('‫109','4VzZ')+_0x4afc29['error_msg']);}else{try{if(_0x54076b[_0x1d62('‮10a','bjT#')]===_0x54076b[_0x1d62('‫10b','5)#X')]){_0x4afc29=JSON[_0x1d62('‫10c','#i6Y')](_0x4afc29);if(_0x4afc29['result']==0x1){if(_0x4afc29[_0x1d62('‫e9','Q0vB')]['lastTimerTime']&&_0x54076b[_0x1d62('‫10d','S1Lf')](Math[_0x1d62('‮10e','yq)M')](new Date()[_0x1d62('‮10f','OT!z')]()),_0x54076b[_0x1d62('‫110','Nnei')](_0x4afc29[_0x1d62('‮111','S0ew')][_0x1d62('‫112','4VzZ')],0xdbba0))){await lottertbox(!![]);}}else{if(_0x54076b['miYFp'](_0x1d62('‫113','RsL^'),_0x1d62('‫114','e)Fh'))){console[_0x1d62('‮115',']Xqy')]('第【'+$[_0x1d62('‮90','Z8kl')]+'】个账号获取定时箱子信息失败，'+_0x4afc29['error_msg']);}else{_0x419e14=_0x4afd32[_0x1d62('‫116','[aqR')];}}}else{$['logErr'](e,_0x495444);}}catch(_0x469e70){if(_0x54076b[_0x1d62('‮117','$qjq')](_0x54076b['aEfkh'],_0x54076b['aEfkh'])){$[_0x1d62('‫118','#i6Y')](_0x469e70,_0x495444);}else{_0x4afd32[_0x1d62('‫119','yvaP')](_0x1f25ec);}}finally{_0x1f25ec();}}},_0x16f308);}}});}async function map(_0x393998,_0x3cf0da){let _0x38d960,_0x4fd144=[];let _0xd025b1='';_0xd025b1=_0x393998+'&'+_0x3cf0da;_0x4fd144=_0xd025b1['split']('&');_0x4fd144['sort']();let _0x1569fe='';for(let _0xba29f2=0x0;_0xba29f2<_0x4fd144[_0x1d62('‮11a','E)h6')];_0xba29f2++){_0x1569fe+=_0x4fd144[_0xba29f2];}return _0x1569fe;}async function getTaskInfo(_0x7b279f=0x3*0x3e8){var _0x399298={'EPhJx':'https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=false&isReadyOfAdPlay=true','crvBr':_0x1d62('‫11b','V(#2'),'JgVYK':function(_0x8ec37,_0x14033f){return _0x8ec37!==_0x14033f;},'lZndy':_0x1d62('‮11c','vNJV'),'svvvQ':'sAGZg','nUOGD':function(_0x524389,_0x1b4dbf){return _0x524389==_0x1b4dbf;},'QTuqK':function(_0x20c325,_0x2cf158){return _0x20c325<_0x2cf158;},'eqeuM':function(_0x390de0,_0x4acfe7){return _0x390de0!==_0x4acfe7;},'IgsxR':'wPPtb','gyBsU':function(_0xdb555f){return _0xdb555f();},'jxfjZ':function(_0x4742c1,_0x3688d8){return _0x4742c1!=_0x3688d8;},'wLErb':function(_0x4ca8a6,_0x547d41){return _0x4ca8a6<_0x547d41;},'FwitG':function(_0x50b771,_0x202e87,_0x28bf01,_0x2c2a4e,_0x1e9401){return _0x50b771(_0x202e87,_0x28bf01,_0x2c2a4e,_0x1e9401);},'ySwFc':_0x1d62('‮11d','Z8kl'),'AuqSM':'MjNdI','SSgNM':function(_0x218de7,_0x39e12c){return _0x218de7!=_0x39e12c;},'vlsls':'apXhi','uWVHa':_0x1d62('‮11e','yq)M'),'XIEfE':'zhibo','pVXkr':function(_0x5ba161,_0x552d56){return _0x5ba161!==_0x552d56;},'zMKUG':_0x1d62('‫11f',']Xqy'),'gcDFt':'ynHkl','DKWIm':function(_0x7f333c,_0x1b0bea){return _0x7f333c<_0x1b0bea;},'uAVgQ':function(_0x28114c,_0x1ed307){return _0x28114c==_0x1ed307;},'EAqfy':'立即领取','OZZPn':'NZdqa','dYglp':function(_0x5a0c91,_0x2b954e){return _0x5a0c91/_0x2b954e;}};return new Promise(_0x3b298f=>{var _0x9b44db={'MbPKU':function(_0x30f8a8,_0x4475a8){return _0x399298['dYglp'](_0x30f8a8,_0x4475a8);},'ywPVn':function(_0x574dca){return _0x399298[_0x1d62('‮120','yxvq')](_0x574dca);}};let _0x57f1a3={'url':_0x1d62('‫121','f4cg'),'headers':{'Accept-Encoding':_0x1d62('‫9','!G[f'),'Cookie':$[_0x1d62('‫7b','Z8kl')],'Connection':_0x1d62('‫122',']Xqy'),'Accept':'*/*','Host':_0x1d62('‮123','9[l^'),'Accept-Language':_0x1d62('‫124','E)h6'),'User-Agent':_0x1d62('‮125','Fs#l')}};$['get'](_0x57f1a3,async(_0x4a3c8b,_0x318dbc,_0x325129)=>{var _0x19f6eb={'RCmcd':_0x399298['EPhJx']};if(_0x399298[_0x1d62('‫126','RsL^')]!==_0x1d62('‫127','!jok')){_0x3b298f();}else{try{if(_0x399298[_0x1d62('‮128','hyKG')](_0x399298['lZndy'],_0x399298[_0x1d62('‫129','e)Fh')])){_0x325129=JSON['parse'](_0x325129);if(_0x399298[_0x1d62('‮12a','jtuT')](_0x325129[_0x1d62('‮12b','[aqR')],0x1)){for(let _0x449244=0x0;_0x399298['QTuqK'](_0x449244,_0x325129['data'][_0x1d62('‫12c','5)#X')][_0x1d62('‮11a','E)h6')]);_0x449244++){if(_0x325129[_0x1d62('‫12d','f4cg')][_0x1d62('‮12e','9[l^')][_0x449244]['id']==0x11){console['log'](_0x1d62('‮12f','2Sbt')+$[_0x1d62('‮130','Nnei')]+_0x1d62('‫131','y]xT')+$[_0x1d62('‫132','vNJV')]+_0x1d62('‫133','hyKG')+_0x325129[_0x1d62('‫134','2Sbt')]['dailyTasks'][_0x449244][_0x1d62('‫135','vNJV')]+_0x1d62('‮136','0CHJ')+_0x325129[_0x1d62('‮137','rsVW')]['dailyTasks'][_0x449244]['completedStages']+'/'+_0x325129[_0x1d62('‮138','PKkH')][_0x1d62('‫139','jtuT')][_0x449244][_0x1d62('‫13a','OT!z')]);if(_0x325129[_0x1d62('‮13b','yvaP')]['dailyTasks'][_0x449244][_0x1d62('‫13c','Z8kl')]<_0x325129['data']['dailyTasks'][_0x449244][_0x1d62('‮13d','Au#O')]){if(_0x399298[_0x1d62('‫13e','y]xT')](_0x399298['IgsxR'],_0x1d62('‫13f','ktm%'))){let _0x22089e=Math[_0x1d62('‮140','PKkH')](new Date()[_0x1d62('‮141','yq)M')]())[_0x1d62('‮142',']Xqy')]();await _0x399298[_0x1d62('‫143','nv1#')](watchvideo);if(_0x399298[_0x1d62('‮144','Au#O')]($['lid'],'0')){let _0xce265=Math[_0x1d62('‮145','2Sbt')](new Date()[_0x1d62('‫146','(Pqu')]())[_0x1d62('‮142',']Xqy')]();await reward(_0x22089e,_0xce265,$[_0x1d62('‮147','E)h6')],_0x1d62('‮148','@4jM'));}}else{console[_0x1d62('‫8e','ktm%')]('第【'+$[_0x1d62('‫149','2Sbt')]+_0x1d62('‫14a','V(#2')+_0x325129[_0x1d62('‫14b','jRt9')]);}}}if(_0x325129[_0x1d62('‫14c','E)h6')][_0x1d62('‮14d','lAL8')][_0x449244]['id']==0x94){console[_0x1d62('‮14e','!G[f')]('账号\x20\x20'+$[_0x1d62('‫14f','(Pqu')]+_0x1d62('‮150','9[l^')+$[_0x1d62('‫132','vNJV')]+']任务['+_0x325129[_0x1d62('‮151','9[l^')][_0x1d62('‫152','nv1#')][_0x449244]['name']+_0x1d62('‮153','fr18')+_0x325129['data'][_0x1d62('‮154','bjT#')][_0x449244]['completedStages']+'/'+_0x325129[_0x1d62('‮151','9[l^')]['dailyTasks'][_0x449244][_0x1d62('‮155','$qjq')]);if(_0x399298[_0x1d62('‮156','ktm%')](_0x325129[_0x1d62('‮157','@4jM')][_0x1d62('‮158','Nnei')][_0x449244][_0x1d62('‮159','yq)M')],_0x325129['data']['dailyTasks'][_0x449244][_0x1d62('‮15a','Z8kl')])){let _0x48d33b=Math[_0x1d62('‫15b','5)#X')](new Date()[_0x1d62('‮15c','RsL^')]())[_0x1d62('‮15d','le!u')]();await _0x399298[_0x1d62('‫15e',']Xqy')](reward,0x0,0x0,0x0,_0x399298[_0x1d62('‮15f','Z8kl')]);}}if(_0x399298['nUOGD'](_0x325129[_0x1d62('‮111','S0ew')][_0x1d62('‮160','yxvq')][_0x449244]['id'],0x22)){if(_0x399298['AuqSM']===_0x399298[_0x1d62('‫161','bjT#')]){console[_0x1d62('‫4f','E)h6')](_0x1d62('‮162','hyKG')+$[_0x1d62('‮163','$qjq')]+_0x1d62('‮164','Fs#l')+$[_0x1d62('‮165','(Pqu')]+']任务['+_0x325129[_0x1d62('‮15','ktm%')]['dailyTasks'][_0x449244][_0x1d62('‮166','Au#O')]+_0x1d62('‫167','tSw(')+_0x325129[_0x1d62('‫41','fr18')]['dailyTasks'][_0x449244][_0x1d62('‮168','Q0vB')]+'/'+_0x325129['data'][_0x1d62('‫152','nv1#')][_0x449244][_0x1d62('‮169','bjT#')]);if(_0x399298['wLErb'](_0x325129[_0x1d62('‫16a','5^2o')][_0x1d62('‮16b','rsVW')][_0x449244][_0x1d62('‮16c','(Pqu')],_0x325129[_0x1d62('‮16d','y]xT')][_0x1d62('‮16e','@4jM')][_0x449244][_0x1d62('‮16f','yxvq')])){let _0x28fe84=Math[_0x1d62('‫170','eU0K')](new Date()['getTime']())[_0x1d62('‫171','y]xT')]();await watchvideo();if(_0x399298[_0x1d62('‮172','OT!z')]($[_0x1d62('‫173','!jok')],'0')){if(_0x399298[_0x1d62('‫174','Au#O')](_0x399298[_0x1d62('‫175','Nnei')],_0x399298[_0x1d62('‫176','CA!(')])){let _0xce265=Math[_0x1d62('‮177','4VzZ')](new Date()['getTime']())[_0x1d62('‮178','9[l^')]();await report(_0x28fe84,_0xce265,$[_0x1d62('‮179','Nnei')],_0x399298['XIEfE']);}else{console[_0x1d62('‫39','@4jM')]('账号\x20\x20'+$[_0x1d62('‫17a','#i6Y')]+_0x1d62('‫f5','@4jM')+$[_0x1d62('‮17b','CA!(')]+']开宝箱冷却时间还有'+_0x9b44db[_0x1d62('‮17c','5^2o')](opentime,0x3e8)+'秒');}}}}else{$['logErr'](e,_0x318dbc);}}if(_0x325129[_0x1d62('‮17d','Fs#l')]['dailyTasks'][_0x449244]['id']==0xa1){if(_0x399298['pVXkr'](_0x399298[_0x1d62('‮17e','V(#2')],_0x399298['gcDFt'])){console[_0x1d62('‫17f','[aqR')]('账号\x20\x20'+$['index']+_0x1d62('‫e5','CA!(')+$[_0x1d62('‫180','#i6Y')]+_0x1d62('‮181','#i6Y')+_0x325129[_0x1d62('‫182','Au#O')][_0x1d62('‮183','eU0K')][_0x449244]['name']+_0x1d62('‮184','bjT#')+_0x325129[_0x1d62('‮185','iBoe')][_0x1d62('‮160','yxvq')][_0x449244][_0x1d62('‮186','f4cg')]+'/'+_0x325129[_0x1d62('‫187','yxvq')]['dailyTasks'][_0x449244][_0x1d62('‮188','RsL^')]);if(_0x399298[_0x1d62('‫189','OT!z')](_0x325129[_0x1d62('‮95','CA!(')][_0x1d62('‮18a','vNJV')][_0x449244][_0x1d62('‮159','yq)M')],_0x325129[_0x1d62('‮10','nv1#')][_0x1d62('‫18b','4VzZ')][_0x449244]['stages'])){}}else{console['log']('第【'+$['index']+'】个账号获取定时箱子信息失败，'+_0x325129[_0x1d62('‮f7','jtuT')]);}}}if(_0x325129['data'][_0x1d62('‮18c','!jok')]){if(_0x399298[_0x1d62('‮18d','!jok')](_0x325129[_0x1d62('‮138','PKkH')][_0x1d62('‮18e','RsL^')][_0x1d62('‮18f','jRt9')],_0x399298[_0x1d62('‫190','&lyo')])){await cashsign();}}}else{if(_0x399298[_0x1d62('‫191','rsVW')]===_0x1d62('‮192','jRt9')){console[_0x1d62('‫193','EtI7')]('第【'+$[_0x1d62('‫194','Fs#l')]+_0x1d62('‫195','fr18')+_0x325129[_0x1d62('‮196','PKkH')]);}else{_0x9b44db[_0x1d62('‫197','4VzZ')](_0x3b298f);}}}else{boxurl=_0x19f6eb[_0x1d62('‫198','RsL^')];}}catch(_0x36f05f){$[_0x1d62('‫199','2Sbt')](_0x36f05f,_0x318dbc);}finally{_0x399298['gyBsU'](_0x3b298f);}}},_0x7b279f);});}async function sign(_0x2fd7b6=0x3*0x3e8){var _0x5c362a={'FCqNj':function(_0xaa5f76,_0xbbca90){return _0xaa5f76!==_0xbbca90;},'Virds':'KbUDI','zJTUf':function(_0x5ea053,_0x215234){return _0x5ea053==_0x215234;},'gFNeH':_0x1d62('‫19a','tSw('),'ayYch':_0x1d62('‫19b','EtI7'),'aASvW':_0x1d62('‮19c','(Pqu'),'QuGAi':_0x1d62('‮19d','Au#O'),'ErquZ':function(_0xa58b35,_0xd7fd71){return _0xa58b35!==_0xd7fd71;},'SHGya':_0x1d62('‫19e','E)h6'),'hAUdk':function(_0x2cc1b0){return _0x2cc1b0();},'bKqfV':function(_0x845194,_0x5094d5){return _0x845194<_0x5094d5;}};return new Promise(_0x38d6e2=>{var _0x40ace6={'kIIMg':function(_0x861968,_0x5ec07f){return _0x5c362a[_0x1d62('‮19f','[aqR')](_0x861968,_0x5ec07f);}};let _0x2a7c24={'url':_0x1d62('‮1a0','Fs#l'),'headers':{'Accept-Encoding':'gzip,\x20deflate','Cookie':$['cookie'],'Connection':'keep-alive','Accept':_0x1d62('‮1a1','Z8kl'),'Host':_0x1d62('‫1a2','bjT#'),'Accept-Language':_0x1d62('‫1a3','S0ew'),'User-Agent':'Kwai-android\x20aegon/3.4.0'}};$[_0x1d62('‮1a4','[aqR')](_0x2a7c24,async(_0x5de5fd,_0x25b0f1,_0x57ce2e)=>{try{if(_0x5c362a['FCqNj'](_0x5c362a['Virds'],'pSrnK')){_0x57ce2e=JSON[_0x1d62('‮1a5','Z8kl')](_0x57ce2e);if(_0x57ce2e[_0x1d62('‫81','rsVW')]==0x1){if(_0x5c362a[_0x1d62('‫1a6','OT!z')](_0x57ce2e[_0x1d62('‫41','fr18')][_0x1d62('‮1a7','4VzZ')][_0x1d62('‫1a8','iBoe')],!![])){if(_0x5c362a[_0x1d62('‫1a9','OT!z')]!==_0x1d62('‫1aa','jRt9')){console['log']('第【'+$[_0x1d62('‮1ab','rsVW')]+_0x1d62('‫1ac','Fs#l')+_0x57ce2e[_0x1d62('‫1ad','yvaP')]);}else{console[_0x1d62('‫1ae','Z8kl')](_0x1d62('‮1af',']Xqy')+$[_0x1d62('‮1b0','!jok')]+_0x1d62('‮164','Fs#l')+$[_0x1d62('‫1b1','y]xT')]+_0x1d62('‮1b2','EtI7')+_0x57ce2e[_0x1d62('‫1b3','le!u')][_0x1d62('‮1b4','y]xT')]['title']);let _0x90ad00=Math[_0x1d62('‫1b5','0CHJ')](new Date()['getTime']())[_0x1d62('‮1b6','S1Lf')]();await watchvideo();if($['lid']!='0'){let _0x3eb848=Math[_0x1d62('‫1b7','nv1#')](new Date()[_0x1d62('‫1b8','PKkH')]())[_0x1d62('‫1b9','E)h6')]();console[_0x1d62('‫1ba','5)#X')]('账号\x20\x20'+$['index']+_0x1d62('‮1bb','5^2o')+$['nickname']+_0x1d62('‫1bc','y]xT'));await reward(_0x90ad00,_0x3eb848,$[_0x1d62('‮1bd','2Sbt')],_0x5c362a[_0x1d62('‮1be','tSw(')]);}_0x90ad00=Math['round'](new Date()[_0x1d62('‮1bf','iBoe')]())[_0x1d62('‫1c0','lAL8')]();await watchvideo();if($[_0x1d62('‮1c1',']Xqy')]!='0'){if(_0x1d62('‫1c2',']Xqy')!==_0x1d62('‮1c3','RsL^')){console[_0x1d62('‫1c4','Nnei')]('账号\x20\x20'+$[_0x1d62('‮1c5','lAL8')]+_0x1d62('‫1c6','0CHJ')+$[_0x1d62('‫1c7','lAL8')]+_0x1d62('‫1c8','yvaP')+_0x57ce2e[_0x1d62('‫83','Nnei')]['dailyTasks'][i][_0x1d62('‮1c9','9[l^')]+_0x1d62('‮1ca','S0ew')+_0x57ce2e[_0x1d62('‫1f','#i6Y')][_0x1d62('‫1cb','f4cg')][i][_0x1d62('‫1cc',']Xqy')]+'/'+_0x57ce2e[_0x1d62('‫1cd','!G[f')][_0x1d62('‮1ce','le!u')][i][_0x1d62('‮13d','Au#O')]);if(_0x40ace6[_0x1d62('‮1cf','Fs#l')](_0x57ce2e[_0x1d62('‮1d0','vNJV')][_0x1d62('‫18b','4VzZ')][i][_0x1d62('‮1d1','y]xT')],_0x57ce2e[_0x1d62('‮13b','yvaP')][_0x1d62('‫1d2','#i6Y')][i][_0x1d62('‮1d3','0CHJ')])){}}else{let _0x207600=Math['round'](new Date()[_0x1d62('‮1d4','f4cg')]())[_0x1d62('‮1d5','iBoe')]();console[_0x1d62('‫1d6','PKkH')](_0x1d62('‫1d7','S0ew')+$['index']+_0x1d62('‫1d8','yq)M')+$[_0x1d62('‮17b','CA!(')]+_0x1d62('‮1d9','&lyo'));await report(_0x90ad00,_0x207600,$[_0x1d62('‮1bd','2Sbt')],_0x1d62('‫1da','tSw('));}}}}}else{console['log']('第【'+$['index']+_0x1d62('‫1db','(Pqu')+_0x57ce2e['error_msg']);}}else{$['logErr'](e,_0x25b0f1);}}catch(_0x282588){if(_0x5c362a['FCqNj'](_0x5c362a[_0x1d62('‫1dc','#i6Y')],_0x5c362a[_0x1d62('‮1dd','Q0vB')])){$[_0x1d62('‮1de','tSw(')](_0x282588,_0x25b0f1);}else{$[_0x1d62('‫1df','9[l^')](_0x282588,_0x25b0f1);}}finally{if(_0x5c362a['ErquZ'](_0x5c362a['SHGya'],_0x1d62('‫1e0','$qjq'))){console[_0x1d62('‮ec','yvaP')]('第【'+$[_0x1d62('‫1e1','[aqR')]+_0x1d62('‫1e2','OT!z')+_0x57ce2e[_0x1d62('‮1e3','rsVW')]);}else{_0x5c362a[_0x1d62('‫1e4','!jok')](_0x38d6e2);}}},_0x2fd7b6);});};_0xod5='jsjiami.com.v6';


//#region 固定代码 可以不管他
// ============================================变量检查============================================ \\
async function Envs() {

    if (ksgscookie) {
        if (ksgscookie.indexOf("@") != -1) {
            ksgscookie.split("@").forEach((item) => {
                if (item) {
                    kscookieArr.push(`${item}`.replace(/;/g, "&"));
                }
            });
        } else if (ksgscookie.indexOf('\n') != -1) {
            ksgscookie.split('\n').forEach((item) => {
                if (item) {
                    kscookieArr.push(`${item}`.replace(/;/g, "&"));
                }
            });
        } else {
            if (ksgscookie) {
                kscookieArr.push(`${ksgscookie}`.replace(/;/g, "&"));
            }
        }
    } else {
        console.log(`\n 【${$.name}】：未填写变量 ksgscookie`)
        return;
    }
    if (!$.token) {
        console.log(`\n 【${$.name}】：未填写变量 ksjsbapitoken`)
        return;
    }
    return true;
}


async function reward(st, et, llid, type, timeout = 3 * 1000) {
    let body = ''
    let taskurl = ''
    let a = 5
    let biz = ''
    a = randomInt(6, 12)
    if (type == 'box1') {
        taskurl = `https://api.e.kuaishou.com/rest/r/ad/nebula/reward?mod=Xiaomi%28MI%206%29&appver=10.3.31.3276&isp=&language=zh-cn&ud=${$.ud}&did_tag=7&net=WIFI&kcv=1458&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.3&oDid=TEST_${$.didi}&android_os=0&boardPlatform=msm8998&kpn=NEBULA&androidApiLevel=28&newOc=XIAOMI&slh=0&country_code=cn&nbh=0&hotfix_ver=&did_gt=1651488299251&keyconfig_state=2&sys=ANDROID_9&max_memory=256&cold_launch_time_ms=1652715238504&oc=XIAOMI&sh=1920&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=Qualcomm%20MSM8998&is_background=0&c=XIAOMI&sw=1080&ftt=&apptype=22&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=5724&grant_browse_type=AUTHORIZED&iuid=&rdid=${$.didi}&sbh=72&darkMode=false&did=${$.didi}`
        let body1 = ''
        body1 = `{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":200${randomInt(1000553820678945, 8999953820679999)},"taskType":1}`
        // `bizStr={"endTime":1650572790615,"eventValue":-1,"rewardList":[${body1}],"startTime":1650572730707,"taskId":77}`
        body = `bizStr={"endTime":${et},"eventValue":-1,"rewardList":[${body1}],"startTime":${st},"taskId":77}`
    } else if (type == 'sign') {
        taskurl = `https://api.e.kuaishou.com/rest/r/ad/nebula/reward?mod=Xiaomi%28MI%206%29&appver=10.3.31.3276&isp=&language=zh-cn&ud=${$.ud}&did_tag=7&net=WIFI&kcv=1458&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.3&oDid=TEST_${$.didi}&android_os=0&boardPlatform=msm8998&kpn=NEBULA&androidApiLevel=28&newOc=XIAOMI&slh=0&country_code=cn&nbh=0&hotfix_ver=&did_gt=1651488299251&keyconfig_state=2&sys=ANDROID_9&max_memory=256&cold_launch_time_ms=1652715238504&oc=XIAOMI&sh=1920&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=Qualcomm%20MSM8998&is_background=0&c=XIAOMI&sw=1080&ftt=&apptype=22&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=5724&grant_browse_type=AUTHORIZED&iuid=&rdid=${$.didi}&sbh=72&darkMode=false&did=${$.didi}`
        let body1 = ''
        body1 = `{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":200${randomInt(1000553820678945, 8999953820679999)},"taskType":1}`
        body = `bizStr={"endTime":${et},"eventValue":136,"rewardList":[${body1}],"startTime":${st},"taskId":-1}`
    } else if (type == 'shipin') {
        taskurl = `https://api.e.kuaishou.com/rest/r/ad/nebula/reward?mod=Xiaomi%28MI%206%29&appver=10.3.31.3276&isp=&language=zh-cn&ud=${$.ud}&did_tag=7&net=WIFI&kcv=1458&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.3&oDid=TEST_${$.didi}&android_os=0&boardPlatform=msm8998&kpn=NEBULA&androidApiLevel=28&newOc=XIAOMI&slh=0&country_code=cn&nbh=0&hotfix_ver=&did_gt=1651488299251&keyconfig_state=2&sys=ANDROID_9&max_memory=256&cold_launch_time_ms=1652715238504&oc=XIAOMI&sh=1920&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=Qualcomm%20MSM8998&is_background=0&c=XIAOMI&sw=1080&ftt=&apptype=22&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=5724&grant_browse_type=AUTHORIZED&iuid=&rdid=${$.didi}&sbh=72&darkMode=false&did=${$.didi}`
        let body1 = ''
        body1 = `{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":200${randomInt(1000553820678945, 8999953820679999)},"taskType":1}`
        body = `bizStr={"endTime":${et},"eventValue":-1,"rewardList":[${body1}],"startTime":${st},"taskId":0}`
    } else if (type == 'guangjie') {
        taskurl = `https://api.e.kuaishou.com/rest/r/reward/task/getActivityReward?mod=Xiaomi%28MI%206%29&appver=10.3.31.3276&isp=&language=zh-cn&ud=${$.ud}&did_tag=7&net=WIFI&kcv=1458&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.3&oDid=TEST_${$.didi}&android_os=0&boardPlatform=msm8998&kpn=NEBULA&androidApiLevel=28&newOc=XIAOMI&slh=0&country_code=cn&nbh=0&hotfix_ver=&did_gt=1651488299251&keyconfig_state=2&sys=ANDROID_9&max_memory=256&cold_launch_time_ms=1652715238504&oc=XIAOMI&sh=1920&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=Qualcomm%20MSM8998&is_background=0&c=XIAOMI&sw=1080&ftt=&apptype=22&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=5724&grant_browse_type=AUTHORIZED&iuid=&rdid=${$.didi}&sbh=72&darkMode=false&did=${$.didi}`
        body = `activityId=148`
    }
    //console.log(body)
    let bodyall = ''
    bodyall = `${body}&cs=false&client_key=2ac2a76d&os=android&kuaishou.api_st=${$.apist}&uQaTag=2`
    let res = ''
    res = await map(`mod=Xiaomi(MI 6)&appver=10.3.31.3276&isp=&language=zh-cn&ud=${$.ud}&did_tag=7&net=WIFI&kcv=1458&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.3&oDid=TEST_${$.didi}&android_os=0&boardPlatform=msm8998&kpn=NEBULA&androidApiLevel=28&newOc=XIAOMI&slh=0&country_code=cn&nbh=0&hotfix_ver=&did_gt=1651488299251&keyconfig_state=2&sys=ANDROID_9&max_memory=256&cold_launch_time_ms=1652715238504&oc=XIAOMI&sh=1920&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=Qualcomm MSM8998&is_background=0&c=XIAOMI&sw=1080&ftt=&apptype=22&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=5724&grant_browse_type=AUTHORIZED&iuid=&rdid=${$.didi}&sbh=72&darkMode=false&did=${$.didi}`, bodyall)
    //console.log(res)
    if (type == 'guangjie') {
        $.sig3 = ""
        await getsig(res, `${$.salt}`, '/rest/r/reward/task/getActivityReward')
        if ($.sig3 == "") {
            for (let l = 0; l < 5; l++) {
                console.log(`账号  ${$.index}  [${$.nickname}]Api[1]访问失败，开始重试${l + 1}/5`)
                await $.wait(2000)
                await getsig(res, `${$.salt}`, '/rest/r/reward/task/getActivityReward')
                if ($.sig3 != "") {
                    break
                }
            }
        }
        if ($.sig3 == "") {
            console.log(`账号  ${$.index}  [${$.nickname}]开始请求Api[2]`)
            await getsig2(res, `${$.salt}`, '/rest/r/reward/task/getActivityReward')
            if ($.sig3 == "") {
                for (let l = 0; l < 5; l++) {
                    console.log(`账号  ${$.index}  [${$.nickname}]Api[2]访问失败，开始重试${l + 1}/5`)
                    await $.wait(2000)
                    await getsig2(res, `${$.salt}`, '/rest/r/reward/task/getActivityReward')
                    if ($.sig3 != "") {
                        break
                    }
                }
            }
        }
        if ($.sig3 == "") {
            console.log(`请求Api失败，防止浪费奖励次数，停止运行。`)
            process.exit(0)
        }
    } else {
        $.sig3 = ""
        await getsig(res, `${$.salt}`, '/rest/r/ad/nebula/reward')
        if ($.sig3 == "") {
            for (let l = 0; l < 5; l++) {
                console.log(`账号  ${$.index}  [${$.nickname}]Api[1]访问失败，开始重试${l + 1}/5`)
                await $.wait(2000)
                await getsig(res, `${$.salt}`, '/rest/r/ad/nebula/reward')
                if ($.sig3 != "") {
                    break
                }
            }
        }
        if ($.sig3 == "") {
            console.log(`开始请求Api[2]`)
            await getsig2(res, `${$.salt}`, '/rest/r/ad/nebula/reward')
            if ($.sig3 == "") {
                for (let ll = 0; ll < 5; ll++) {
                    console.log(`账号  ${$.index}  [${$.nickname}]Api[2]访问失败，开始重试${ll + 1}/5`)
                    await $.wait(2000)
                    await getsig2(res, `${$.salt}`, '/rest/r/ad/nebula/reward')
                    if ($.sig3 != "") {
                        break
                    }
                }
            }
        }
        if ($.sig3 == "") {
            console.log(`请求Api失败，防止浪费奖励次数，停止运行。`)
            process.exit(0)
        }
    }
    //console.log($.sig)
    //console.log($.sig3)
    //console.log($.tokensig)
    bodyall = bodyall + `&sig=${$.sig}&__NS_sig3=${$.sig3}&__NStokensig=${$.tokensig}`
    //console.log(taskurl)
    //console.log(bodyall)
    let url = {
        url: taskurl,
        body: bodyall,
        headers: {
            'Host': 'api.e.kuaishou.com',
            'Connection': 'keep-alive',
            //'Content-Length': 1269,
            //'Cookie':' __NSWJ=n0YJXHE8xM1oo+V43oTFnRYiYxJXaIxVmOz3+k4BvQ3E4GgraxBCx7s/85nUgCtHAAAADQ==;kuaishou.api_st=${$.apist};token=${$.apist};region_ticket=RT_1E3818EF997F43B73084047E3C7A30DC1C2C9C2DB8D20E1E80E56F52BEBF8A76DEB56EA7B',
            'User-Agent': 'kwai-android aegon/3.4.2',
            'Accept-Language': 'zh-cn',
            //'X-REQUESTID': 165271751872860209,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate, br',
            'X-Client-Info': 'model=MI 6;os=Android;nqe-score=2;network=WIFI;signal-strength=4;'
        }
    }
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    if (data.data.awardAmount) {
                        console.log(`账号  ${$.index}  [${$.nickname}]获得${data.data.awardAmount}金币`)
                    }
                    if (data.data.amount) {
                        console.log(`账号  ${$.index}  [${$.nickname}]获得${data.data.amount}金币`)
                    }
                } else {
                    console.log(`第【${$.index}】个账号领取奖励失败，${data.error_msg}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

async function report(st, et, llid, type, timeout = 3 * 1000) {
    let body = ''
    //1040
    //56dfe31594b858e69ef613f5e97227fbd4ab96cb9fa6000119ec3d6ebf88ee730d3f30cdc1c9029a523453210de5e4922eaf1032a200b76e58f4d1ce8fbb571da3cc6b1f11f37f9adfda67b633b46692
    //1011
    //56dfe31594b858e69ef613f5e97227fbc4e267aa66e321e03590d0315b1870915f96d6c551177dba5f50eb85e77088c924e9ead7b8741a742e550d2dd0d2a2e610e0cefd225d99e754ceaa7c61792e40
    //console.log(`lid:${llid}`)
    //264
    //56dfe31594b858e69ef613f5e97227fbe097a4a092b07f22caafe3f8a466f881c3212b59181e06f9ed9538c157c7e5b0ccffb60e02e288420598440828940ccc3abbfe580c5bf04df66eaf3e58769fd0
    // 99                             41e266333b2a5f18ebb8085cc9db9712
    //747                             e9fdebcb318306b03233191291af1c90
    //56dfe31594b858e69ef613f5e97227fbabbcabda19cc301529762b301b341745981b437b7420d62ce58fceb3ab75ef4bca5d4aa28c3b8cfe17e3b347bc504f9b97adecb997b6a98b60a26bd1d2099135
    if (type == 'zhibo') {
        body = `bizStr={"businessId":75,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092","mediaScene":"video","neoInfos":[{"creativeId":21876287785,"extInfo":"","llsid":${llid},"taskType":1}],"pageId":100012068,"posId":6765,"startTime":${st},"subPageId":100015089}`
    } else if (type == '161-1') {
        if ($.index <= $.fenge) {
            body = `bizStr={"businessId":161,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbd4ab96cb9fa6000119ec3d6ebf88ee730d3f30cdc1c9029a523453210de5e4922eaf1032a200b76e58f4d1ce8fbb571da3cc6b1f11f37f9adfda67b633b46692","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4684,"startTime":${st},"subPageId":100013628}`
        } else {
            body = `bizStr={"businessId":161,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbd4ab96cb9fa6000119ec3d6ebf88ee730d3f30cdc1c9029a523453210de5e4922eaf1032a200b76e58f4d1ce8fbb571da3cc6b1f11f37f9adfda67b633b46692","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4684,"startTime":${st},"subPageId":100013628}`
        }

    } else if (type == '161-2') {
        if ($.index <= $.fenge) {
            body = `bizStr={"businessId":161,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbdcb463ff3c43b7da970d0eb459638c81047212c9a2874296c575bde17961401b04335bac733b92fbb70aa26a45b731bb95b2c94fef41d61e3650fa61b6440b32","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4685,"startTime":${st},"subPageId":100013628}`
        } else {
            body = `bizStr={"businessId":161,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbe097a4a092b07f22caafe3f8a466f881c3212b59181e06f9ed9538c157c7e5b0ccffb60e02e288420598440828940ccc3abbfe580c5bf04df66eaf3e58769fd0","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4685,"startTime":${st},"subPageId":100013628}`
        }

    } else if (type == '11-1') {
        if ($.index <= $.fenge) {
            body = `bizStr={"businessId":11,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbdcb463ff3c43b7da970d0eb459638c81047212c9a2874296c575bde17961401b04335bac733b92fbb70aa26a45b731bb95b2c94fef41d61e3650fa61b6440b32","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4684,"startTime":${st},"subPageId":100013628}`
        } else {
            body = `bizStr={"businessId":11,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbe097a4a092b07f22caafe3f8a466f881c3212b59181e06f9ed9538c157c7e5b0ccffb60e02e288420598440828940ccc3abbfe580c5bf04df66eaf3e58769fd0","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4684,"startTime":${st},"subPageId":100013628}`
        }
    } else if (type == '11-2') {
        if ($.index <= $.fenge) {
            body = `bizStr={"businessId":11,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbdcb463ff3c43b7da970d0eb459638c81047212c9a2874296c575bde17961401b04335bac733b92fbb70aa26a45b731bb95b2c94fef41d61e3650fa61b6440b32","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4685,"startTime":${st},"subPageId":100013628}`
        } else {
            body = `bizStr={"businessId":11,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbe097a4a092b07f22caafe3f8a466f881c3212b59181e06f9ed9538c157c7e5b0ccffb60e02e288420598440828940ccc3abbfe580c5bf04df66eaf3e58769fd0","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4685,"startTime":${st},"subPageId":100013628}`
        }

    } else if (type == 'lott') {
        body = `bizStr={"businessId":161,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fbc7b4adb59060f8b57992dbd5cfdde59d19704f3df5df67acf27d0e98a7b6f0cbbe624cfa294b7d1826d8d2053b164ca92e26340e075bb546a4cab639e79e0936","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4685,"startTime":${st},"subPageId":100013630}`
    } else if (type == '20') {//22587657845
        //56dfe31594b858e69ef613f5e97227fbbb96a095a83d06547ab4b9123b4787ab1757f244713e786f8d83724994a8db2238002805326f918b25120a4df27099686674ce329755221aede5fad1eb599838 
        body = `bizStr={"businessId":161,"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fb80029addcedc57d8114a19aceff4b5a4dbcaa81ee7101dfbc3c475fa19d1a6979c16ac3acaa082cf3690637b103bab58a4b6470802d248e78d563972c0dbc7ad","mediaScene":"video","neoInfos":[{"creativeId":${randomInt(20000001997, 22999991997)},"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4684,"startTime":${st},"subPageId":100013629}`
    } else if (type=="173"){
        body=`bizStr={"businessId":173,"endTime":${et},"extParams":"7bbfc3a0dae4b6833220f0f19b006982f070c9656f83f7ab6b661fdbac091ba7593a6fe1f889945f151f2d76c9a56853ad0ab0e943959345c944831ac48bb9bd1bc3c31c97b879044a1fd86516a2737e94481c88797ae9650905ddcbbe7229e3218a529b79d1da3f51bbbbe3a3d2e6c5ea2dd1105e0a297c49b84402f9511275e1298be5f106edb9bf135ce546ce933d","mediaScene":"video","neoInfos":[{"creativeId":23799209984,"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":5685,"startTime":${st},"subPageId":100014361}`
    }else {
        body = `bizStr={"businessId":${type},"endTime":${et},"extParams":"56dfe31594b858e69ef613f5e97227fb02f1c8305a022e731b19317aa8b8f1fc4e68b5f6b346e62dade3545f285630556b0fd3c366406646a28bdd7a3889ca5b1bd5be22786fb5f8de8fc684d491e8e0","mediaScene":"video","neoInfos":[{"creativeId":22587646206,"extInfo":"","llsid":${llid},"taskType":1}],"pageId":11101,"posId":4684,"startTime":${st},"subPageId":100013629}`
    }
    //{"pageId":,"subPageId":,"businessId":161,"extParams":"","customData":{"exitInfo":{"toastDesc":"","toastImgUrl":""}},"pendantType":1,"displayType":2,"channel":0}
    let bodyall = ''
    let res = ''
    bodyall = `${body}&cs=false&client_key=2ac2a76d&os=android&kuaishou.api_st=${$.apist}&uQaTag=2`
    //bodyall=`bizStr={"businessId":161,"endTime":1652723492645,"extParams":"56dfe31594b858e69ef613f5e97227fb80029addcedc57d8114a19aceff4b5a4dbcaa81ee7101dfbc3c475fa19d1a6979c16ac3acaa082cf3690637b103bab58a4b6470802d248e78d563972c0dbc7ad","mediaScene":"video","neoInfos":[{"creativeId":23124767119,"extInfo":"","llsid":2001333028941508290,"taskType":1}],"pageId":11101,"posId":4684,"startTime":1652723442581,"subPageId":100013629}&cs=false&client_key=2ac2a76d&os=android&kuaishou.api_st=${$.apist}&uQaTag=2&token=${$.apist}`
    res = await map(`mod=Xiaomi(MI 6)&appver=10.3.31.3276&isp=&language=zh-cn&ud=${$.ud}&did_tag=7&egid=DFP8E053D864EE0728066E793AC38D7E643F46C9BB44B370864D1D21BD50169D&net=WIFI&kcv=1458&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.3&oDid=TEST_${$.didi}&android_os=0&boardPlatform=msm8998&kpn=NEBULA&androidApiLevel=28&newOc=XIAOMI&slh=0&country_code=cn&nbh=0&hotfix_ver=&did_gt=1651488299251&keyconfig_state=2&sys=ANDROID_9&max_memory=256&cold_launch_time_ms=1652722195854&oc=XIAOMI&sh=1920&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=Qualcomm MSM8998&is_background=0&c=XIAOMI&sw=1080&ftt=&apptype=22&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=5724&grant_browse_type=AUTHORIZED&iuid=&rdid=${$.didi}&sbh=72&darkMode=false&did=${$.didi}`, bodyall)
    //console.log(res)
    $.sig3 = ""
    //await getsig(res, `${$.salt}`, '/rest/r/ad/task/report')
    await getsig(res, `${$.salt}`, '/rest/r/ad/task/report')
    if ($.sig3 == "") {
        for (let l = 0; l < 5; l++) {
            console.log(`账号  ${$.index}  [${$.nickname}]Api[1]访问失败，开始重试${l + 1}/5`)
            await $.wait(2000)
            await getsig(res, `${$.salt}`, '/rest/r/ad/task/report')
            if ($.sig3 != "") {
                break
            }
        }
    }
    if ($.sig3 == "") {
        console.log(`开始请求Api[2]`)
        await getsig2(res, `${$.salt}`, '/rest/r/ad/task/report')
        if ($.sig3 == "") {
            for (let ll = 0; ll < 5; ll++) {
                console.log(`账号  ${$.index}  [${$.nickname}]Api[2]访问失败，开始重试${ll + 1}/5`)
                await $.wait(2000)
                await getsig2(res, `${$.salt}`, '/rest/r/ad/task/report')
                if ($.sig3 != "") {
                    break
                }
            }
        }
    }
    if ($.sig3 == "") {
        console.log(`请求Api失败，防止浪费奖励次数，停止运行。`)
        process.exit(0)
    }
    //console.log(`res:${body}&cs=false&client_key&client_salt=${$.salt}&did=${$.didi}&egid=DFP8E053D864EE0728066E793AC38D7E643F46C9BB44B370864D1D21BD50169D`)
    bodyall = bodyall + `&sig=${$.sig}&__NS_sig3=${$.sig3}&__NStokensig=${$.tokensig}`
    //console.log(bodyall)
    let url = {
        url: `https://api2.e.kuaishou.com/rest/r/ad/task/report?mod=Xiaomi%28MI%206%29&appver=10.3.31.3276&isp=&language=zh-cn&ud=${$.ud}&did_tag=7&egid=DFP8E053D864EE0728066E793AC38D7E643F46C9BB44B370864D1D21BD50169D&net=WIFI&kcv=1458&app=0&kpf=ANDROID_PHONE&bottom_navigation=true&ver=10.3&oDid=TEST_${$.didi}&android_os=0&boardPlatform=msm8998&kpn=NEBULA&androidApiLevel=28&newOc=XIAOMI&slh=0&country_code=cn&nbh=0&hotfix_ver=&did_gt=1651488299251&keyconfig_state=2&sys=ANDROID_9&max_memory=256&cold_launch_time_ms=1652722195854&oc=XIAOMI&sh=1920&app_status=3&ddpi=480&deviceBit=0&browseType=3&power_mode=0&socName=Qualcomm MSM8998&is_background=0&c=XIAOMI&sw=1080&ftt=&apptype=22&abi=arm64&userRecoBit=0&device_abi=arm64&totalMemory=5724&grant_browse_type=AUTHORIZED&iuid=&rdid=${$.didi}&sbh=72&darkMode=false&did=${$.didi}`,
        body: bodyall,
        headers: {
            'Host': 'api2.e.kuaishou.com',
            'Connection': 'keep-alive',
            //'Content-Length': 1269,
            //'Cookie':' __NSWJ=n0YJXHE8xM1oo+V43oTFnRYiYxJXaIxVmOz3+k4BvQ3E4GgraxBCx7s/85nUgCtHAAAADQ==;kuaishou.api_st=${$.apist};token=${$.apist};region_ticket=RT_1E3818EF997F43B73084047E3C7A30DC1C2C9C2DB8D20E1E80E56F52BEBF8A76DEB56EA7B',
            'User-Agent': 'kwai-android aegon/3.4.2',
            'Accept-Language': 'zh-cn',
            //'X-REQUESTID': 165271751872860209,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate, br',
            'X-Client-Info': 'model=MI 6;os=Android;nqe-score=2;network=WIFI;signal-strength=4;'
        }
    }
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1) {
                    if(type=='173'){
                        console.log(`账号  ${$.index}  [${$.nickname}]获取阅读激励奖励成功(上限50次)`)
                    }else{
                        console.log(`账号  ${$.index}  [${$.nickname}]获得${data.data.neoAmount}金币`)
                    }
                    if (data.data.neoAmount == 0) {
                        if (type == '161-1') {
                            $.sp_161 = false
                        }
                        if (type == '11-1') {
                            $.sp_11 = false
                        }
                        if (type == '161-2') {
                            $.sp_161 = false
                        }
                        if (type == '11-2') {
                            $.sp_11 = false
                        }
                        if (type == '11') {
                            $.sp_11_80 = false
                        }
                        if (type == '20') {
                            $.sp_161_80 = false
                        }
                        if (type == '259') {
                            $.sp_259 = false
                        }
                    }
                } else if (data.message == '今日奖励领完啦, 明日继续来吧') {
                    if (type == '161-1') {
                        $.sp_161 = false
                    }
                    if (type == '11-1') {
                        $.sp_11 = false
                    }
                    if (type == '161-2') {
                        $.sp_161 = false
                    }
                    if (type == '11-2') {
                        $.sp_11 = false
                    }
                    if (type == '11') {
                        $.sp_11_80 = false
                    }
                    if (type == '20') {
                        $.sp_161_80 = false
                    }
                    if (type == '259') {
                        $.sp_259 = false
                    }
                    console.log(`第【${$.index}】个账号领取奖励失败，${data.error_msg}`)
                } else {
                    console.log(`第【${$.index}】个账号领取奖励失败，${data.error_msg}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


async function getsig(body, salt, url1, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            //url: `http://cc544gw.fknngessw98873.kuaishou631.life/sig`,
            url: `http://cc544gw.fknngessw98873.kuaishou631.life/sig`,
            headers: { "token": `${$.token}` },
            body: `body=${body},client_salt=${salt},url=${url1}`
        }

        $.post(url, async (err, resp, data) => {
            try {
                if (resp && resp.statusCode == 200) {
                    if (data.indexOf('sig') > -1) {
                        data = data.replace(/\"/g, "");
                        data = data.replace(/,/g, '&');

                        let data1 = null
                        data1 = querystring.parse(data)
                        $.sig = (data1.sig)
                        $.sig3 = (data1.__NS_sig3)
                        $.tokensig = data1.__nstokensig
                        $.signum = data1.token_result

                        console.log(`账号  ${$.index}  [${$.nickname}]当前Api剩余请求次数：${$.signum}`)
                    } else if (data.indexOf('你没有Token') > -1) {
                        console.log(`账号  ${$.index}  [${$.nickname}]你没有token！！！！`)
                        process.exit(0)
                    } else if (data == '请求次数0') {
                        console.log(`账号  ${$.index}  [${$.nickname}]你的请求次数为0`)
                        process.exit(0)
                    } else {
                        console.log(`账号  ${$.index}  [${$.nickname}]${data}`)
                    }
                } else {
                }
                //return data1
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


async function getsig2(body, salt, url1, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            //url: ``,
            url: `http://cc544gw.fknngessw98873.kuaishou631.life/sig`,
            headers: { "token": `${$.token}` },
            body: `body=${body},client_salt=${salt},url=${url1}`
        }
        $.post(url, async (err, resp, data) => {
            try {
                if (resp && resp.statusCode == 200) {
                    if (data.indexOf('sig') > -1) {
                        data = data.replace(/\"/g, "");
                        data = data.replace(/,/g, '&')
                        let data1 = null
                        data1 = querystring.parse(data)
                        $.sig = (data1.sig)
                        $.sig3 = (data1.__NS_sig3)
                        $.tokensig = data1.__nstokensig
                        $.signum = data1.token_result
                        console.log(`账号  ${$.index}  [${$.nickname}]当前Api剩余请求次数：${$.signum}`)
                    } else if (data.indexOf('你没有Token') > -1) {
                        console.log(`账号  ${$.index}  [${$.nickname}]你没有token！！！！`)
                        process.exit(0)
                    } else if (data == '请求次数0') {
                        console.log(`账号  ${$.index}  [${$.nickname}]你的请求次数为0`)
                        process.exit(0)
                    } else {
                        console.log(`账号  ${$.index}  [${$.nickname}]${data}`)
                    }
                } else {
                }
                //return data1
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

async function cashsign(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://nebula.kuaishou.com/rest/n/nebula/cashSign/goldenAreaTaskSignIn`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            }
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(data)
                if (data.result == 1) {

                } else {
                    console.log(`第【${$.index}】个账号获取签到信息失败，${data.error_msg}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

async function watchvideo(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        //let api_st = ($.cookie.match(/kuaishou.api_st=(\S*);ksjsbPayType/))[1]
        let url = {
            url: `https://api.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA`,
            body: `${$.enc}`,
            headers: {
                'Accept-Encoding': `gzip, deflate`,
                // 'Cookie': $.cookie,
                'Connection': `keep-alive`,
                'Accept': `*/*`,
                //'Host': `nebula.kuaishou.com`,
                'Accept-Language': `en-us`,
                "User-Agent": `Kwai-android aegon/3.4.0`,
            }
        }
        $.post(url, async (err, resp, data) => {
            try {
                //console.log(resp)
                data = JSON.parse(data)
                //console.log(data)
                if (data.result == 1 && data.llsid) {
                    $.lid = data.llsid
                    let wai = randomInt(5, 8)
                    //await $.wait(wai * 1000)
                } else {
                    //console.log(data)
                    $.lid = '0'
                    //console.log(`第【${$.index}】个账号获取定时箱子信息失败，${data.error_msg}`)
                }
                $.lid = `200${randomInt(1000553820678945, 8999953820679999)}`
                let wai = randomInt(3, 5)
                await $.wait(wai * 1000)
                //await $.wait(4 * 1000)
                //console.log($.lid)

            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        console.log(message);
    }
}

/**
 * 随机数生成
 */
function randomString(e) {
    e = e || 16;
    var t = "abcdef1234567890",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


//#endregion

async function base64de(sti) {
    let srt = Buffer.from(sti, 'base64').toString();
    return (srt)
}


// prettier-ignore   固定代码  不用管他
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

