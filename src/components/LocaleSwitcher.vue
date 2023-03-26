<template>
    <div class="locale-switcher">🌐 {{ $i18n.locale }}
        <select v-model="$i18n.locale">
            <option value="en"> {{$t("locale-switcher-english")}}</option>
            <option value="es">{{$t("locale-switcher-spanish")}}</option>
        </select>
    </div>
</template>