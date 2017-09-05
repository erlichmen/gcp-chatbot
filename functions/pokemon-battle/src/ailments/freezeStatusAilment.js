// Generated by CoffeeScript 1.12.7
(function() {
  var FreezeStatusAilment, StatusAilment,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  StatusAilment = require('./statusAilment');

  FreezeStatusAilment = (function(superClass) {
    extend(FreezeStatusAilment, superClass);

    function FreezeStatusAilment() {
      return FreezeStatusAilment.__super__.constructor.apply(this, arguments);
    }

    FreezeStatusAilment.prototype.whenInflicted = function(pokemon, log) {
      return log.message(pokemon.trainerAndName() + " was frozen solid!");
    };

    FreezeStatusAilment.prototype.canAttack = function(pokemon, log) {
      if (Math.random() < 0.20) {
        log.message(pokemon.trainerAndName() + " thawed out!");
        pokemon.ailment = null;
        return true;
      } else {
        log.message(pokemon.trainerAndName() + " is frozen solid!");
        return false;
      }
    };

    FreezeStatusAilment.prototype.battleMultiplier = function(chance) {
      return 1 + 0.5 * chance / 100;
    };

    return FreezeStatusAilment;

  })(StatusAilment);

  module.exports = FreezeStatusAilment;

}).call(this);