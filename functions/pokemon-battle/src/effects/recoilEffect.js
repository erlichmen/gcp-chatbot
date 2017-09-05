// Generated by CoffeeScript 1.12.7
(function() {
  var DefaultEffect, RecoilEffect,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  DefaultEffect = require('./defaultEffect');

  RecoilEffect = (function(superClass) {
    extend(RecoilEffect, superClass);

    function RecoilEffect() {
      return RecoilEffect.__super__.constructor.apply(this, arguments);
    }

    RecoilEffect.prototype.recoil = function(damage, pokemon) {
      switch (this.id) {
        case 49:
          return Math.round(damage / 4);
        case 199:
        case 254:
        case 263:
          return Math.round(damage / 3);
        case 270:
          return Math.round(damage / 2);
        default:
          return 0;
      }
    };

    RecoilEffect.prototype.buildMultiplier = function(attacker) {
      switch (this.id) {
        case 49:
        case 199:
        case 254:
        case 263:
          return 0.85;
        case 270:
          return 0.5;
      }
    };

    RecoilEffect.prototype.battleMultiplier = function(attacker, defender, damage, lethal) {
      return 1 - this.recoil(damage, attacker) / attacker.hp / 1.5;
    };

    RecoilEffect.prototype.afterDamage = function(attacker, defender, damage, log) {
      return attacker.takeDamage(this.recoil(damage, attacker), "%(pokemon) was hurt %(damage) by recoil!", log);
    };

    return RecoilEffect;

  })(DefaultEffect);

  module.exports = RecoilEffect;

}).call(this);