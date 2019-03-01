const fs   = require('fs'),
      yaml = require('js-yaml');

var data = yaml.safeLoad(fs.readFileSync('src/credentials.yml', 'utf8'));

var professionalLen = data.Skills.Professional.length,
    proficientLen   = data.Skills.Proficient.length;
    familiarLen     = data.Skills.Familiar.length;

data.SkillsMaxLength = Math.max(professionalLen, proficientLen, familiarLen);

module.exports = data;