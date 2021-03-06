// Generated by CoffeeScript 1.12.7
(function() {
  var Effect, Move, Type, fs;

  fs = require('fs');

  Type = require('./type');

  Effect = require('./effect');

  Move = (function() {
    Move.DAMAGE_NONE = 'non-damaging';

    Move.DAMAGE_PHYSICAL = 'physical';

    Move.DAMAGE_SPECIAL = 'special';

    Move.movedex = JSON.parse(fs.readFileSync(__dirname + '/../data/moves.json').toString());

    Move.Struggle = new Move(165);

    function Move(id) {
      var move;
      move = this.constructor.movedex[id];
      if (move == null) {
        throw new Error("Move not found: " + id);
      }
      this.id = move.id;
      this.name = move.name;
      this.type = new Type(move.type);
      this.basePower = move.power;
      this.accuracy = move.accuracy > 0 ? move.accuracy : 100;
      this.priority = move.priority;
      this.effect = Effect.make(move.effect, move.effect_chance);
      this.damageClass = move.damage_class;
    }

    Move.prototype.banned = function() {
      return this.damageClass === this.constructor.DAMAGE_NONE || this.effect.banned() || this.power() < 2;
    };

    Move.prototype.attackStat = function() {
      if (this.damageClass === this.constructor.DAMAGE_PHYSICAL) {
        return 'attack';
      } else {
        return 'spattack';
      }
    };

    Move.prototype.defenseStat = function() {
      if (this.damageClass === this.constructor.DAMAGE_PHYSICAL) {
        return 'defense';
      } else {
        return 'spdefense';
      }
    };

    Move.prototype.buildMultiplier = function(attacker) {
      var base;
      base = this.effect.buildMultiplier(attacker);
      if (this.priority > 0) {
        base *= 1.33;
      }
      if (this.priority < 0) {
        base *= 0.9;
      }
      return base;
    };

    Move.prototype.battleMultiplier = function(attacker, defender, damage) {
      var base, lethal;
      lethal = damage >= defender.hp;
      base = this.accuracy / 100;
      if (this.priority > 0 && lethal) {
        base *= 5;
      }
      base *= this.effect.battleMultiplier(attacker, defender, damage, lethal);
      return base;
    };

    Move.prototype.effectiveness = function(attacker, defender) {
      var effectiveness;
      effectiveness = this.type.effectivenessAgainst(defender.types);
      return this.effect.effectiveness(effectiveness, attacker, defender);
    };

    Move.prototype.power = function(attacker, defender) {
      return this.effect.power(this.basePower, attacker, defender);
    };

    Move.prototype.hits = function() {
      return this.effect.hits();
    };

    Move.prototype.criticalRateStage = function() {
      return this.effect.criticalRateStage();
    };

    Move.prototype.afterDamage = function(attacker, defender, damage, log) {
      return this.effect.afterDamage(attacker, defender, damage, log);
    };

    Move.prototype.afterMiss = function(attacker, defender, log) {
      return this.effect.afterMiss(attacker, defender, log);
    };

    Move.prototype.toString = function() {
      return this.name + " (" + this.type.name + " - " + (this.basePower === 1 ? 'X' : this.basePower) + " power - " + this.accuracy + " accuracy)";
    };

    return Move;

  })();

  module.exports = Move;

}).call(this);
