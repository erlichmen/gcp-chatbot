// Generated by CoffeeScript 1.12.7
(function() {
  var RecoilEffect, StruggleEffect,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  RecoilEffect = require('./recoilEffect');

  StruggleEffect = (function(superClass) {
    extend(StruggleEffect, superClass);

    function StruggleEffect() {
      return StruggleEffect.__super__.constructor.apply(this, arguments);
    }

    StruggleEffect.prototype.recoil = function(damage, pokemon) {
      return Math.round(pokemon.maxHp / 4);
    };

    StruggleEffect.prototype.effectiveness = function(effectiveness, attacker, defender) {
      return 1;
    };

    return StruggleEffect;

  })(RecoilEffect);

  module.exports = StruggleEffect;

}).call(this);