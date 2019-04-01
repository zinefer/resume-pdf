const fs   = require('fs'),
      yaml = require('js-yaml');

var merge = require('deepmerge');

var data = yaml.safeLoad(fs.readFileSync('src/credentials.yml', 'utf8'));

// Calculate the longest list to assist the layout
var professionalLen = data.Skills.Professional.length,
    proficientLen   = data.Skills.Proficient.length;
    familiarLen     = data.Skills.Familiar.length;
data.SkillsMaxLength = Math.max(professionalLen, proficientLen, familiarLen);

// Calculate years of experience
var firstJob  = data.Experience.length-1,
    workingMS = Date.now() - new Date(data.Experience[firstJob].HireDate).getTime(),
    years     = Math.abs(new Date(workingMS).getUTCFullYear() - 1970);
data.YearsExperience = years

// Handle cli arguments
const argv = require('yargs').argv

module.exports = merge(data, argv);