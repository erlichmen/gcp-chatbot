// Generated by CoffeeScript 1.12.7
(function() {
  var DefaultEffect, SwitchOutEffect,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  DefaultEffect = require('./defaultEffect');

  SwitchOutEffect = (function(superClass) {
    extend(SwitchOutEffect, superClass);

    function SwitchOutEffect() {
      return SwitchOutEffect.__super__.constructor.apply(this, arguments);
    }

    SwitchOutEffect.prototype.battleMultiplier = function(attacker, defender, damage, lethal) {
      var hasOtherPokemon;
      hasOtherPokemon = attacker.trainer.ablePokemon().length > 1;
      if ((defender.typeAdvantageAgainst(attacker)) && attacker.speed() > defender.speed() && hasOtherPokemon) {
        return 2;
      } else {
        return 1;
      }
    };

    SwitchOutEffect.prototype.afterDamage = function(attacker, defender, damage, log) {
      var trainer;
      trainer = attacker.trainer;
      if (trainer.ablePokemon().length > 1) {
        return trainer.switchPokemon(defender, log);
      }
    };

    return SwitchOutEffect;

  })(DefaultEffect);

  module.exports = SwitchOutEffect;

}).call(this);