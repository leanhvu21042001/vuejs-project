<template>
  <div id="login-view">
    <main class="vh-100 d-flex">
      <div class="card m-auto">
        <div class="card-body">
          <form id="login-form">
            <div class="mb-3">
              <label for="emailInput" class="form-label">Email address</label>
              <input name="email" type="email" value="" class="form-control" id="emailInput" />

              <!-- <p class="text-danger">@error email</p> -->
            </div>

            <div class="mb-3">
              <label for="passwordInput" class="form-label">Password</label>
              <input
                name="password"
                type="password"
                value=""
                class="form-control"
                id="passwordInput"
              />
              <!-- <p class="text-danger">@error password</p> -->
            </div>

            <div class="d-flex flex-row flex-wrap justify-content-between gap-3">
              <div class="form-check d-flex align-items-center gap-2">
                <input name="remember" type="checkbox" class="form-check-input" id="remember" />
                <label class="form-check-label" for="remember">Remember me</label>
              </div>
              <button type="submit" class="btn btn-primary" name="login" value="login">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
