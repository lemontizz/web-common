/* eslint-disable */

export default {
    pattern: {
        num: "[0-9]",
        str: "[A-Za-z]",
        spe: "[~!@#$%^&*()_+`\\-={}:\";'<>?,.\\/]",
        num_str: "(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]",
        str_spe: "(?![a-zA-Z]+$)(?![~!@#$%^&*()_+`\\-={}:\";'<>?,.\\/]+$)[A-Za-z!@#$%^&*()_+`\\-={}:\";'<>?,.\\/]",
        num_spe: "(?![0-9]+$)(?![~!@#$%^&*()_+`\\-={}:\";'<>?,.\\/]+$)[0-9!@#$%^&*()_+`\\-={}:\";'<>?,.\\/]",
        num_str_spe: "(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+`\\-={}:\";'<>?,.\\/])."
    },
    setPasswordRule(rule) {

        let min_len = rule.min_leng,
        	max_len = rule.max_leng,
        	numStatus = rule.rules.number,
        	charStatus = rule.rules.charset,
        	specStatus = rule.rules.special,
        	flag = '',
        	msgText = '';

        if ( numStatus && !charStatus && !specStatus) {
            flag = 'num';
            msgText = '位数字';
        } else if (charStatus && !specStatus && !numStatus) {
            flag = 'str';
            msgText = '位大小写字母';
        } else if (specStatus && !charStatus && !numStatus) {
            flag = 'spe';
            msgText = '位特殊字符';
        } else if (charStatus && numStatus && !specStatus) {
            flag = 'num_str';
            msgText = '位大小写字母与数字组合';
        } else if (charStatus && specStatus && !numStatus) {
            flag = 'str_spe';
            msgText = '位特殊字符与大小写字母组合';
        } else if (specStatus && numStatus && !charStatus) {
            flag = 'num_spe';
            msgText = '位特殊字符与数字组合';
        } else if (charStatus && specStatus && numStatus) {
            flag = 'num_str_spe';
            msgText = '位特殊字符、大小写字母与数字组合';
        }
        let ruleMsg = this.setRuleMsg(msgText, max_len, min_len);
        let ruleExp = '^' + this.pattern[flag] + '{' + min_len + ',' + max_len + '}$';
        return ({
            bool: true,
            msg: ruleMsg,
            error: '',
            rule: ruleExp
        });
    },
    setRuleMsg(msgText, max_len, min_len) {
        let str = (max_len > min_len) ? ('密码为' + min_len + '~' + max_len) : ('密码为' + min_len);
        return (str + msgText);
    },
    checkPasswd(passwd, msg, rule) {

        let regChines = new RegExp(/[\u4e00-\u9fa5]+/);
        if(regChines.test(passwd)){
            return ({
                bool: false,
                msg: msg,
                error: '密码不能含有中文',
                rule: rule
            });
        }
        let regSpace = new RegExp(/ /);
        if(regSpace.test(passwd)){
            return ({
                bool: false,
                msg: msg,
                error: '密码不能含有空格',
                rule: rule
            });
        }

        let regExpRule = new RegExp(rule);
        return ({
            bool: regExpRule.test(passwd),
            msg: msg,
            error: msg,
            rule: rule
        });
    }
}