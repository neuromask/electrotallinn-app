<template>
    <section>
      <b-row>
        <b-col cols="12" lg="8" class="mb-lg-0 mb-5">
          <h3 class="underline font-weight-bold">{{ $t('nav.game') }}</h3>
          <b-card no-body class="rounded text-white" bg-variant="secondary" :class="[mounted ? 'visible' : 'invisible']">
            <div class="d-flex position-relative" ref="wrapper">
              <div v-for="i in lineOptions.length" :key="i" ref="winLine" :class="`win-line blink win-line-${i-1}`"></div>
              <div class="slot-container mx-auto" ref="container">
                <div class="slot rounded" v-for="slotColumn in populateSlots" :key="slotColumn.id" ref="slots">
                  <div class="slot-wrap">
                    <div v-for="index in 3" :key="index">
                      <div class="slot-item" :style="slotStyle" v-for="opt in slotColumn" ref="slotBox" :key="opt.id">
                        <b-img fluid-grow ref="slotImg" :src="require(`@/assets/img/game/${opt.src}`)" :alt="opt.label" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-3">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <b-badge variant="light" class="pb-0 text-left">
                  <h2 class="font-weight-bold mb-0 text-center">{{ balance }}</h2>
                  <p style="margin-top:-5px" class="w-100 text-center mb-1 font-weight-bold text-secondary small">{{ $t('game.balance') }}</p>
                </b-badge>
                <b-button @click="start" variant="primary" :disabled="disabled" size="lg" class="text-white rounded pulse btn-spin font-weight-bold pulse text-uppercase">{{ $t('game.spin') }}</b-button>
              </div>
              <div ref="win" class="win">
                <b-badge variant="warning" class="p-2 mt-3 w-100">
                  <h2 class="text-white font-weight-bold text-uppercase">{{ $t('game.win') }}</h2>
                  <b-badge variant="info" class="p-2 w-100">
                    <div class="d-flex w-100 justify-content-between align-items-center">
                      <div>
                        <div v-for="i in lineOptions.length" :key="i">
                          <h6 ref="winShow" :class="`mb-0 text-left win-show win-show-${i-1}`"></h6>
                        </div>
                      </div>
                      <h5 class="font-weight-bold mb-0 win-total">{{ $t('game.totalWin') }}: <span ref="winTotal"></span></h5>
                    </div>
                  </b-badge>
                </b-badge>
              </div>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" lg="4">
          <h3 class="underline font-weight-bold">{{ $t('game.pay') }}</h3>
          <b-table table-variant="dark" class="bg-secondary rounded" borderless outlined striped :items="paytable" :fields="payFields" thead-class="d-none">
            <template #cell(indx)="data">
              <div class="d-flex justify-content-center align-items-center pay-table">
                <b-img :src="require(`@/assets/img/game/${data.item.img1}`)" center fluid />
                <b-img :src="require(`@/assets/img/game/${data.item.img2}`)" center fluid />
                <b-img :src="require(`@/assets/img/game/${data.item.img3}`)" center fluid />
                <b-badge variant="light" class="pb-0 text-left">
                  <h3 class="font-weight-bold text-center">{{ data.item.amount }}</h3>
                  <p v-if="data.item.winpos" style="margin-top:-5px" class="w-100 text-center mb-1 font-weight-bold text-secondary small">{{ $t(`game.${data.item.winpos}`) }}</p>
                </b-badge>
              </div>
            </template>
          </b-table>
          <div v-if="$user.role == 'ADMIN'" class="debug rounded mt-3">
              <div class="p-3">
                  <div class="mb-2">
                      <p class="mb-0">Balance:</p>
                      <input id="balanceDebug" type="number" min="1" max="5000" maxlength="5" name="balanceDebug" v-model.number="balance" @input="inputCheck($event)" />
                  </div>
                  <div class="mb-2">
                      <p class="mb-0">Mode:
                      <input type="radio" id="random" @change="radioRandom" value="random" v-model="positionMode">
                      <label class="mb-0" for="random">Random</label>
                      <input type="radio" value="fixed" @change="radioFixed" id="fixed" v-model="positionMode">
                      <label class="mb-0" for="fixed">Fixed</label>
                      </p>
                  </div>
                  <div class="mb-2">
                      <p class="mb-0">Symbol:</p>
                      <select v-for="i in slotsAmount" :key="i" @change="selectSymbol($event, i-1)" :disabled="debugInputsDis">
                          <option v-for="(option, index) in populateSlots[i-1]" :key="option.id" :value="index">{{ option.label }}</option>
                      </select>
                  </div>
                  <div>
                      <p class="mb-0">Line:</p>
                      <select v-for="i in slotsAmount" :key="i" @change="selectLine($event, i-1)" :disabled="debugInputsDis">
                          <option v-for="option in lineOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                      </select>
                  </div>
                  <b-button class="mt-2" size="sm" @click="runTestRun">Test run 100</b-button>
              </div>
          </div>
        </b-col>
      </b-row> 
    </section>
</template>
<script>
import json from "../assets/json/game.json";

export default {
  data: function() {
    return {
      lines: json.winLines,
      slots: json.slots,
      paytable: json.payTable[0].items,
      extraItems: 3,
      gamePrice: 1,
      slotsAmount: 3,
      opts: null,
      startedAt: null,
      isFullFinished: false,
      balance: 0,
      disabled: false,
      winTotal: null,
      positionMode: "random",
      debugInputsDis: true,
      selectedSymbol: [0, 0, 0], // 0 - 3xBAR ..
      linePosition: 0.5, // 2 - bottom, 1 - top, 0 - center, 0.5 - random
      linePositionFixed: [1, 1, 1], // 2 - bottom, 1 - top, 0 - center, 0.5 - random
      wrapWidth: null,
      mounted: false,
      slotStyle: {
        width: "140px",
        height: "180px",
        pureHeight: null
      }
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  watch: {
    '$user.balance'(newValue, oldValue) {
      this.balance = newValue;
    }
  },
  mounted() {
    this.mounted = true;
    window.addEventListener("resize", this.myEventHandler);
    this.setSize();
    this.balance = this.$user.balance;
  },
  computed: {
    populateSlots() {
      let randomItem = () => {
        return this.slots[0].items[this.randomInterval(0,2)]
      }
      let col1 = [...this.slots[0].items, ...new Array(this.extraItems).fill(randomItem())]
      let col2 = [...this.slots[0].items, ...new Array(this.extraItems).fill(randomItem())]
      let col3 = [...this.slots[0].items, ...new Array(this.extraItems).fill(randomItem())]

      const matrix = [this.shuffleArray(col1),this.shuffleArray(col2),this.shuffleArray(col3)]
      return matrix
      //return new Array(this.slotsAmount).fill(this.slots[0]);
    },
    lineOptions() {
      return [
        { text: this.$t("game.top"), value: 1 },
        { text: this.$t("game.center"), value: 0 },
        { text: this.$t("game.bottom"), value: 2 }
      ];
    },
    payFields() {
      return [
        { key: 'indx'}
      ]
    }
  },
  methods: {
    updateBalance() {
      this.$axios.$put(`${this.$config.apiUrl}/users/${this.$user.uin}/balance`, {balance: this.balance}).then((response) => {
        this.$user.balance = this.balance;
      });
    },
    myEventHandler(e) {
      this.setSize();
    },
    setSize() {
      this.wrapWidth = this.$refs.wrapper.offsetWidth;
      this.$refs.container.style.width = this.wrapWidth + "px";
      this.$refs.container.style.height = this.wrapWidth * 0.857 + "px";
      this.slotStyle.width = this.wrapWidth / 3 + "px";
      this.slotStyle.height = (this.wrapWidth / 3) * 1.285 + "px";
      this.slotStyle.pureHeight = (this.wrapWidth / 3) * 1.285;
    },
    start(e, isTest) {
      this.$gtm.push({ event: 'game_started' })
      if (this.opts || this.balance < 1) {
        return;
      }
      // reset
      this.balance -= this.gamePrice;
      this.winTotal = null;
      this.$refs.win.style.display = "none";
      for (let i = 0; i < this.lineOptions.length; i++) {
        this.$refs.winShow[i].innerText = "";
        this.$refs.winLine[i].style.display = "none";
      }
      this.winResult = [[], [], []];
      this.disabled = true;
      this.isFullFinished = false;

      this.opts = this.populateSlots.map((data, i) => {
        const slot = this.$refs.slots[i];
        let choice;
        // random or fixed mode choice from debug options
        if (this.positionMode === "random") {
          choice = Math.floor(Math.random() * data.length);
        } else {
          this.linePosition = this.linePositionFixed[i];
          if (this.linePosition === 2) {
            choice = this.selectedSymbol[i] - 1;
          } else {
            choice = this.selectedSymbol[i];
          }
        }
        //console.log("choice", choice, data.items[choice], i, data.items.length)
        // make arrays for different lines depending on choice
        if (Math.random() < this.linePosition) {
          // top / bottom
          slot.querySelector(".slot-wrap").style.marginTop = -this.slotStyle.pureHeight / 2 + "px";

          if (this.linePosition === 2 && choice < 0) {
            this.winResult[0].push(data[data.length - 1].label);
          } else {
            this.winResult[0].push(data[choice].label);
          }
          if (choice === data.length - 1) {
            this.winResult[2].push(data[0].label);
          } else {
            this.winResult[2].push(data[choice + 1].label);
          }
        } else {
          // center
          slot.querySelector(".slot-wrap").style.marginTop = "0";
          this.winResult[1].push(data[choice].label);
        }
        // options for animation
        return {
          el: slot.querySelector(".slot-wrap"),
          finalPos: choice * this.slotStyle.pureHeight - this.slotStyle.pureHeight / 2,
          startOffset: this.slotStyle.pureHeight * (1+i/4)*10,
          height: data.length * this.slotStyle.pureHeight,
          duration: 1500 + 500 * i, // milliseconds
          isFinished: false
        };
      });
      // animate
      if (isTest) {
        this.opts = null;
        this.result();
      } else {
        this.animate();
      }
    },
    animate(timestamp) {
      if (this.startedAt == null) {
        this.startedAt = timestamp;
      }
      const timeDiff = timestamp - this.startedAt;

      this.opts.forEach((opt, i) => {
        if (opt.isFinished) {
          return;
        }
        const timeRemaining = Math.max(opt.duration - timeDiff, 0);
        const power = 3;
        const offset = (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) * opt.startOffset;
        // negative - slots go from top to bottom
        const pos = -1 * Math.floor(((offset + opt.finalPos) % opt.height) + opt.height);
        opt.el.style.transform = "translateY(" + pos + "px)";
        if (timeDiff > opt.duration) {
          opt.isFinished = true;
          timeDiff
        }
      });
      // animation check for all slots
      if (this.opts.every(o => o.isFinished)) {
        this.opts = null;
        this.startedAt = null;
        this.result();
      } else {
        requestAnimationFrame(this.animate);
      }
    },
    result() {
      // comparing results for three lines
      for (let entry of this.lines) {
        for (let i = 0; i < this.lineOptions.length; i++) {
          if (this.compareArrays(this.winResult[i], entry.items)) {
            this.winTotal += entry.payOut[i];
            this.$refs.winShow[i].innerText = this.lineOptions[i].text + ": " + entry.payOut[i];
            this.$refs.winLine[i].style.display = "block";
          }
        }
      }
      this.isFullFinished = true;
      this.win();
      this.isDisabled();
      this.updateBalance();
    },
    compareArrays(a1, a2) {
      return (
        a1.length === a2.length && a1.sort().every((v, i) => v === a2.sort()[i])
      );
    },
    radioFixed() {
      this.linePosition = 1;
      this.debugInputsDis = false;
    },
    radioRandom() {
      this.linePosition = 0.5;
      this.debugInputsDis = true;
    },
    isDisabled() {
      if (this.balance < 1) {
        this.disabled = true;
      } else if (this.isFullFinished) {
        this.disabled = false;
      }
    },
    win() {
      if (this.winTotal) {
        //console.log(this.winTotal)
        this.$refs.win.style.display = "block";
        this.$refs.winTotal.innerText = this.winTotal;
        this.balance += parseInt(this.winTotal);
        this.isDisabled();
      }
    },
    selectSymbol(event, form) {
      this.selectedSymbol[form] = parseInt(event.target.value);
    },
    selectLine(event, form) {
      this.linePositionFixed[form] = parseInt(event.target.value);
    },
    inputCheck(event) {
      let min = parseInt(event.target.getAttribute("min"));
      let max = parseInt(event.target.getAttribute("max"));
      let value = parseInt(event.target.value);
      if (value > max) this.balance = max;
      if (value < min) this.balance = min;
      this.isDisabled();
    },
    shuffleArray(array) {
      let arrayCopy = JSON.parse(JSON.stringify(array))
      for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
      }
      return arrayCopy
    },
    randomInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    runTestRun() {
      for (let i = 0; i <= 100; i++) {
        this.start(null, true)
        //console.log('Test index: '+i)
      }
    }
  }
};
</script>
<style scoped>
.pay-table > img {
  width: 60px;
  height: 50px;
  object-fit: cover;
}
.pay-table > span {
  min-width: 80px;
}
</style>
