<template>
  <section>
    <b-row class="my-5 align-items-center">
      <b-col cols="12" lg="4" class="mb-lg-0 mb-5">
        <b-img-lazy class="px-4" src="~/assets/img/logo/circle-anim.svg" width="320" height="320" alt="ElectroTallinn logotype" fluid center />
      </b-col>
      <b-col cols="12" lg="8">
        <div>
          <h2 class="mb-0 font-weight-bold">ElectroTallinn</h2>
          <h3 class="mb-0 font-weight-bold">{{ $tc('main.aboutText', 1) }}</h3>
        </div>
        <hr class="hr-sm">
        <p class="mb-3 lead">{{ $t('main.goalText') }}</p>
        <b-button class="font-weight-bold mr-2" variant="primary" size="lg" :to="localePath('/market')">{{ $t('nav.market') }}</b-button>
        <b-button class="font-weight-bold" variant="outline-primary" size="lg" v-b-modal.video-modal>{{ $t('main.video') }} <b-icon icon="youtube" /></b-button>
        <VideoModal />
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="12" lg="4" class="mb-lg-0 mb-3">
        <b-card class="shadow-sm">
          <h4 class="font-weight-bold mx-auto underline">{{ $tc('home.infoBox1', 1) }}</h4>
          <b-img-lazy class="shadow-sm mb-3" alt="ElectroTallinn" width="320" height="320" center fluid rounded src="~/assets/img/home/box2-home.jpg" />
          <p class="text-center mb-0 opacity-75">{{ $tc('home.infoBox1', 2) }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4" class="mb-lg-0 mb-3">
        <b-card class="shadow-sm">
          <h4 class="font-weight-bold mx-auto underline">{{ $tc('home.infoBox3', 1) }}</h4>
          <b-img-lazy class="shadow-sm mb-3" alt="ElectroTallinn" width="320" height="320" center fluid rounded src="~/assets/img/home/box3-home.jpg" />
          <p class="text-center mb-0 opacity-75">{{ $tc('home.infoBox3', 2) }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4">
        <b-card class="shadow-sm">
          <h4 class="font-weight-bold mx-auto underline">{{ $tc('home.infoBox2', 1) }}</h4>
          <b-img-lazy class="shadow-sm mb-3" alt="ElectroTallinn" width="320" height="320" center fluid rounded src="~/assets/img/home/box1-home.jpg" />
          <p class="text-center mb-0 opacity-75">{{ $tc('home.infoBox2', 2) }}</p>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="12" lg="6" class="mb-lg-0 mb-5">
        <Weather />
      </b-col>
      <b-col cols="12" lg="6">
        <b-list-group class="shadow-sm">
          <b-list-group-item variant="light" href="https://www.facebook.com/groups/electrotallinn" target="_blank" class="text-secondary">
            <b-media tag="div">
              <template #aside>
                <b-icon variant="primary" width="64" height="64" icon="facebook" class="mt-2" />
              </template>
              <h5 class="font-weight-bold">{{ $tc('home.linkBox1', 1) }}</h5>
              <p class="mb-0 opacity-75">{{ $tc('home.linkBox1', 2) }}</p>
            </b-media>
          </b-list-group-item>
          <b-list-group-item variant="light" href="https://t.me/electrotallinn" target="_blank" class="text-secondary">
            <b-media tag="div">
              <template #aside>
                <div style="width:64px; height:64px" class="mt-2 text-primary" v-html="require('~/assets/icons/bootstrap/telegram.svg?raw')" />
              </template>
              <h5 class="font-weight-bold">{{ $tc('home.linkBox2', 1) }}</h5>
              <p class="mb-0 opacity-75">{{ $tc('home.linkBox2', 2) }}</p>
            </b-media>
          </b-list-group-item>
          <b-list-group-item variant="light" href="https://discord.io/electrotallinn" target="_blank" class="text-secondary">
            <b-media tag="div">
              <template #aside>
                <b-icon variant="primary" width="64" height="64" icon="discord" class="mt-2" />
              </template>
              <h5 class="font-weight-bold">{{ $tc('home.linkBox3', 1) }}</h5>
              <p class="mb-0 opacity-75">{{ $tc('home.linkBox3', 2) }}</p>
            </b-media>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row class="my-5 justify-content-center">
      <b-col cols="12" lg="8" class="mx-auto">
        <b-alert show variant="primary" class="bg-pat d-flex justify-content-between align-items-center mb-0 rounded shadow-sm w-100 p-3">
          <b-icon variant="primary" width="48" height="48" icon="calendar-event-fill" class="mr-4 mr-lg-5 ml-lg-4" />
          <div class="w-100">
            <h5 class="mb-0 text-dark font-weight-bold">{{ $tc('home.eventBox', 1) }}</h5>
            <hr class="hr-sm">
            <p class="mb-3 text-dark opacity-75">{{ $tc('home.eventBox', 2) }}</p>
            <b-button block class="nowrap ml-auto font-weight-bold" font-scale="2" variant="primary" href="https://www.facebook.com/groups/electrotallinn/events" target="_blank">{{ $t('action.findOut') }} <b-icon icon="arrow-right-short" /></b-button>
          </div>
        </b-alert>
      </b-col>
    </b-row >
    <b-row class="bg-warning full-row px-lg-5 py-5">
      <b-col cols="12" lg="4" class="mb-3 mb-lg-0 text-white">
        <div class="d-flex justify-content-between align-items-center mb-0 w-100">
          <b-icon variant="info" width="48" height="48" icon="geo-alt-fill" class="mr-4 ml-lg-4" />
          <div class="w-100">
            <h3 class="mb-0">{{ $tc('home.iconBox1', 1) }}</h3>
            <p class="mb-1 lead font-weight-bold">{{ $tc('home.iconBox1', 2) }}</p>
            <p class="mb-0">{{ $t('home.iconBox1Content') }}.</p>
          </div>
        </div>
      </b-col>
      <b-col cols="12" lg="4" class="mb-3 mb-lg-0 text-white">
        <div class="d-flex justify-content-between align-items-center mb-0 w-100">
          <b-icon variant="info" width="48" height="48" icon="asterisk" class="mr-4 ml-lg-4" />
          <div class="w-100">
            <h3 class="mb-0">{{ $tc('home.iconBox2', 1) }}</h3>
            <p class="mb-1 lead font-weight-bold">{{ $tc('home.iconBox2', 2) }}</p>
            <p class="mb-0">{{ $t('home.iconBox2Content') }}.</p>
          </div>
        </div>
      </b-col>
      <b-col cols="12" lg="4" class="text-white">
        <div class="d-flex justify-content-between align-items-center mb-0 w-100">
          <b-icon variant="info" width="48" height="48" icon="suit-heart-fill" class="mr-4 ml-lg-4" />
          <div class="w-100">
            <h3 class="mb-0">{{ $tc('home.iconBox3', 1) }}</h3>
            <p class="mb-1 lead font-weight-bold">{{ $tc('home.iconBox3', 2) }}</p>
            <p class="mb-0">{{ $t('home.iconBox3Content') }}.</p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="bg-lightning full-row px-lg-5 px-3">
      <div class="w-100 mt-5">
        <div class="d-flex justify-content-between align-items-start">
          <h3 class="underline font-weight-bold">{{ $t('main.photo') }}</h3>
          <b-button font-scale="2" variant="primary" href="https://www.flickr.com/photos/electrotallinn/" target="_blank"><b-icon icon="card-image" /> {{ $t('main.allPhotos') }}</b-button>
        </div>
        <Gallery loc="@/assets/img/gallery/" />
      </div>
      <div class="w-100 my-5">
        <div class="w-100 d-flex justify-content-between align-items-start">
          <h3 class="underline font-weight-bold">{{ $t('main.video') }}</h3>
          <b-button font-scale="2" variant="primary" href="https://www.youtube.com/electrotallinn" target="_blank"><b-icon icon="youtube" /> YouTube</b-button>
        </div>
        <b-row>
          <b-col class="mb-3" cols="12" lg="6">
            <vue-tube class="rounded shadow-sm" imageLoading="lazy" videoId="M0ezw-mZuDQ" />
          </b-col>
          <b-col cols="12" lg="6">
            <vue-tube class="rounded shadow-sm" imageLoading="lazy" videoId="xBGrpeQ_TUc" />
          </b-col>
        </b-row>
      </div>
      <Count class="mb-5" />
      <SocialBlock />
    </b-row>
  </section>
</template>

<script></script>
