<template>
    <section>
        <b-row>
          <b-col cols="12" lg="8" class="pb-3">
            <div class="d-flex position-relative" ref="wrapper">
              <div v-for="i in lineOptions.length" :key="i">
                  <div ref="winLine" :class="'win-line win-line-' + (i-1)"></div>
              </div>
              <div class='slot-container mx-auto' ref="container">
                <div class='slot' v-for='slot in populateSlots' :key='slot.id' ref='slots'>
                    <div class='slot-window'>
                        <div class='slot-wrap'>
                            <div v-for="index in slotsAmount" :key="index">
                                <div class='slot-item' :style="slotStyle" v-for='opt in slot.items' ref="slotBox" :key='opt.id'>
                                    <b-img fluid ref="slotImg" :src='opt.src' :alt='opt.label' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <b-card class="mt-3">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <h3 class="m-0">{{ $t('game.balance') }}: <span class="font-weight-bold balance-amount">{{ balance }}</span></h3>
                <b-button @click='start' variant="primary" :disabled='disabled' size="lg" class="pulse text-white font-weight-bold rounded btn-spin pulse text-uppercase">{{ $t('game.spin') }}</b-button>
              </div>
              <div ref='win' class="win">
                <b-badge variant="warning" class="p-2 mt-3 w-100">
                  <h2 class="text-white font-weight-bold text-uppercase">{{ $t('game.win') }}</h2>
                  <b-badge variant="info" class="p-2 w-100">
                    <div class="d-flex w-100 justify-content-between align-items-center">
                      <div>
                        <div v-for="i in lineOptions.length" :key="i">
                          <h6 ref="winShow" :class="`mb-0 text-left win-show win-show-${i-1}`"></h6>
                        </div>
                      </div>
                      <h5 class='font-weight-bold mb-0 win-total'>{{ $t('game.totalWin') }}: <span ref='winTotal'></span></h5>
                    </div>
                  </b-badge>
                </b-badge>
              </div>
            </b-card>
          </b-col>
          <b-col cols="12" lg="4">
            <b-card>
              <h3 class="font-weight-bold"><b-badge variant="warning" class="text-white">{{ $t('game.pay') }}</b-badge> {{ $t('game.table') }}</h3>
              <hr>
              <b-img src='~/assets/img/game/pay.png' cender fit alt='' />
              <div v-if="$user.role == 'ADMIN'" class='debug rounded mt-3'>
                  <div class='debug-content'>
                      <div>
                          <p class="debug-head">Balance:</p>
                          <input id="balanceDebug" type='number' min='1' max='5000' maxlength='5' name='balanceDebug' v-model.number='balance' @input="inputCheck($event)" />
                      </div>
                      <div class='position'>
                          <p class="debug-head">Mode:</p>
                          <input type='radio' id='random' @change='radioRandom' value='random' v-model='positionMode'>
                          <label for='random'>Random</label>
                          <input type='radio' value='fixed' @change='radioFixed' id='fixed' v-model='positionMode'>
                          <label for='fixed'>Fixed</label>
                      </div>
                      <div>
                          <p class="debug-head">Symbol:</p>
                          <select v-for="i in slotsAmount" :key="i" @change="selectSymbol($event, i-1)" :disabled='debugInputsDis'>
                              <option v-for='(option, index) in slots[0].items' :key='option.id' :value='index'>{{ option.label }}</option>
                          </select>
                      </div>
                      <div>
                          <p class="debug-head">Line:</p>
                          <select v-for="i in slotsAmount" :key="i" @change="selectLine($event, i-1)" :disabled='debugInputsDis'>
                              <option v-for='option in lineOptions' :key='option.value' :value='option.value'>{{ option.text }}</option>
                          </select>
                      </div>
                  </div>
              </div>
            </b-card>
          </b-col>
        </b-row> 
    </section>
</template>

<script>
    import json from '../assets/json/win-rates.json';

    export default {
        name: 'slotMachine',
        props: {
            msg: String
        },
        data: function () {
            return {
                lines: json,
                slots: [{
                  items: [
                    {label: 'BAT3', src: require('~/assets/img/game/icon-bat-3.svg')},
                    {label: 'BAT1', src: require('~/assets/img/game/icon-bat-1.svg')},
                    {label: 'BAT2', src: require('~/assets/img/game/icon-bat-2.svg')},
                    {label: 'ET', src: require('~/assets/img/game/icon-med.svg')},
                    {label: 'ZEUS', src: require('~/assets/img/game/icon-best.svg')}
                  ]
                }],
                slotsAmount: 3,
                opts: null,
                startedAt: null,
                isFullFinished: false,
                balance: 100,
                disabled: false,
                winTotal: null,
                positionMode: 'random',
                debugInputsDis: true,
                selectedSymbol: [0, 0, 0], // 0 - 3xBAR ..
                linePosition: 0.5, // 2 - bottom, 1 - top, 0 - center, 0.5 - random
                linePositionFixed: [1, 1, 1], // 2 - bottom, 1 - top, 0 - center, 0.5 - random
                wrapWidth: null,
                slotStyle: {
                  width: '140px',
                  height: '180px',
                  pureHeight: null
                }
            }
        },
        destroyed() {
          window.removeEventListener("resize", this.myEventHandler);
        },
        mounted () {
          this.$refs.container.style.visibility = 'visible'
          window.addEventListener("resize", this.myEventHandler);
          this.setSize()
        },
        computed: {
          populateSlots () {
            return new Array(this.slotsAmount).fill(this.slots[0]);
          },
          lineOptions() {
            return [
              {text: this.$t('game.top'), value: 1},
              {text: this.$t('game.center'), value: 0},
              {text: this.$t('game.bottom'), value: 2}
            ]
          }
        },
        methods: {
            myEventHandler(e) {
              this.setSize()
            },
            setSize () {
              this.wrapWidth = this.$refs.wrapper.offsetWidth
              this.$refs.container.style.width = this.wrapWidth+'px';
              this.$refs.container.style.height = this.wrapWidth*0.857+'px';
              this.slotStyle.width = this.wrapWidth/3+'px'
              this.slotStyle.height = this.wrapWidth/3*1.285+'px'
              this.slotStyle.pureHeight = this.wrapWidth/3*1.285
              
            },
            start () {
                if (this.opts) { return }
                // reset
                this.balance -= 1;
                this.winTotal = null;
                this.$refs.win.style.display = "none";
                for (let i = 0; i < this.lineOptions.length; i++) {
                    this.$refs.winShow[i].innerText = '';
                    this.$refs.winLine[i].style.display = "none";
                }
                this.winResult = [[],[],[]];
                this.disabled = true;
                this.isFullFinished = false;

                this.opts = this.populateSlots.map((data, i) => {
                    const slot = this.$refs.slots[i];
                    let choice;
                    // random or fixed mode choice from debug options
                    if (this.positionMode === 'random') {
                        choice = Math.floor(Math.random() * data.items.length)
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
                        slot.querySelector('.slot-wrap').style.marginTop = -this.slotStyle.pureHeight/2+'px';

                        if (this.linePosition === 2 && choice < 0) {
                            this.winResult[0].push(data.items[data.items.length - 1].label);
                        } else {
                            this.winResult[0].push(data.items[choice].label);
                        }
                        if (choice === data.items.length - 1) {
                            this.winResult[2].push(data.items[0].label);
                        } else {
                            this.winResult[2].push(data.items[choice + 1].label);
                        }
                    } else {
                        // center
                        slot.querySelector('.slot-wrap').style.marginTop = '0';
                        this.winResult[1].push(data.items[choice].label);
                    }
                    // options for animation
                    return {
                      
                        el: slot.querySelector('.slot-wrap'),
                        finalPos: choice * this.slotStyle.pureHeight - this.slotStyle.pureHeight/2,
                        startOffset: 2000,
                        height: data.items.length * this.slotStyle.pureHeight,
                        duration: 2000 + i * 500, // milliseconds
                        isFinished: false
                    };
                });
                // animate
                this.animate()
            },
            animate (timestamp) {

                const next = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function (cb) {
                    window.setTimeout(cb, 1000 / 60)
                };

                if (this.startedAt == null) { this.startedAt = timestamp }
                const timeDiff = timestamp - this.startedAt;

                this.opts.forEach(opt => {
                    if (opt.isFinished) { return }
                    const timeRemaining = Math.max(opt.duration - timeDiff, 0);
                    const power = 3;
                    const offset = (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) * opt.startOffset;
                    // negative - slots go from top to bottom
                    const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height + opt.height);
                    opt.el.style.transform = "translateY(" + pos + "px)";
                    if (timeDiff > opt.duration) { opt.isFinished = true }
                });
                // animation check for all slots
                if (this.opts.every(o => o.isFinished)) {
                    this.opts = null;
                    this.startedAt = null;
                    this.result()
                } else {
                    next(this.animate)
                }

            },
            result () {
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

            },
            compareArrays (a1, a2) {
                return a1.length === a2.length && a1.sort().every((v,i)=> v === a2.sort()[i]);
            },
            radioFixed () {
                this.linePosition = 1;
                this.debugInputsDis = false;
            },
            radioRandom () {
                this.linePosition = 0.5;
                this.debugInputsDis = true;
            },
            isDisabled () {
                if (this.balance < 1) {
                    this.disabled = true;
                } else if (this.isFullFinished) {
                    this.disabled = false;
                }
            },
            win () {
                if (this.winTotal)  {
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
                let min = parseInt(event.target.getAttribute('min'));
                let max = parseInt(event.target.getAttribute('max'));
                let value = parseInt(event.target.value);
                if (value > max) this.balance = max;
                if (value < min) this.balance = min;
                this.isDisabled();
            }
        }
    }


</script>