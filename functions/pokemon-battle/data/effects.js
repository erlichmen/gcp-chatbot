// Generated by CoffeeScript 1.12.7
(function() {
  var Effect, Move, csv, fs, options, path, printEffect, ref;

  csv = require('csv');

  fs = require('fs');

  Move = require('../src/move');

  Effect = require('../src/effect');

  path = (ref = process.argv[2]) != null ? ref : __dirname + '/pokedex/pokedex/data/csv';

  options = {
    delimiter: ',',
    escape: '"',
    columns: true
  };

  printEffect = function(effect) {
    if (effect.examples.length === 0 || !effect.damages) {
      return '';
    }
    return effect.id + ": " + effect.effect + " (" + effect.examples.slice(0, 3).join(", ") + (effect.examples.length > 3 ? '...' : '') + ")  \n";
  };

  fs.exists(path, function(exists) {
    if (exists) {
      return csv().from.path(path + "/move_effect_prose.csv", options).to.array(function(rows) {
        var effect, effects, i, id, len, move, output, ref1, row;
        effects = {};
        for (i = 0, len = rows.length; i < len; i++) {
          row = rows[i];
          if (row.move_effect_id < 10000) {
            effects[row.move_effect_id] = {
              id: +row.move_effect_id,
              effect: row.short_effect.replace(/\$effect_chance% /g, '').replace(/\[(.*?)\]{.+?:(.+?)}/g, function(match, name, href) {
                if (name.length > 0) {
                  return name;
                } else {
                  return href;
                }
              }),
              damages: false,
              state: null,
              examples: []
            };
          }
        }
        ref1 = Move.movedex;
        for (id in ref1) {
          move = ref1[id];
          effect = Effect.make(move.effect);
          effects[effect.id].state = (function() {
            switch (false) {
              case !effect.banned():
                return 'banned';
              case !effect.fullSupport():
                return 'supported';
              default:
                return 'partly-supported';
            }
          })();
          effects[effect.id].damages = effects[effect.id].damages || move.damage_class !== 'non-damaging';
          effects[effect.id].examples.push(move.name);
        }
        output = '';
        output += "## Supported Effects ##\n";
        output += "The following moves are fully supported.\n\n";
        for (id in effects) {
          effect = effects[id];
          if (effect.state === 'supported') {
            output += printEffect(effect);
          }
        }
        output += "\n## Partly Supported Effects ##\n";
        output += "The following moves can be used but not all side effects will take place.\n\n";
        for (id in effects) {
          effect = effects[id];
          if (effect.state === 'partly-supported') {
            output += printEffect(effect);
          }
        }
        output += "\n## Banned Effects ##\n";
        output += "The following moves cannot be used in battle.\n\n";
        for (id in effects) {
          effect = effects[id];
          if (effect.state === 'banned') {
            output += printEffect(effect);
          }
        }
        return fs.writeFile(__dirname + '/../docs/effects.md', output.trim());
      });
    } else {
      return console.log("Usage: coffe " + process.argv[1] + " path/to/csvs\n");
    }
  });

}).call(this);
