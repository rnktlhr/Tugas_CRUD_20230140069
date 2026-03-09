const API_URL = '/ktp';
let allData = [];

$(document).ready(function () {
    loadKtpData();

    // ── Form Submit ──────────────────────────
    $('#ktpForm').on('submit', function (e) {
        e.preventDefault();

        const jenisKelamin = $('#jenisKelamin').val();
        if (!jenisKelamin) {
            showError('Jenis kelamin harus dipilih.');
            return;
        }

        const id = $('#ktpId').val();
        const ktpData = {
            nomorKtp:     $('#nomorKtp').val().trim(),
            namaLengkap:  $('#namaLengkap').val().trim(),
            alamat:       $('#alamat').val().trim(),
            tanggalLahir: $('#tanggalLahir').val(),
            jenisKelamin: jenisKelamin
        };

        if (id) updateKtp(id, ktpData);
        else createKtp(ktpData);
    });

    // ── Reset Button ─────────────────────────
    $('#btnReset').on('click', resetForm);

    // ── Search ───────────────────────────────
    $('#searchInput').on('input', function () {
        const q = $(this).val().toLowerCase();
        const filtered = allData.filter(k =>
            k.namaLengkap.toLowerCase().includes(q) ||
            k.nomorKtp.toLowerCase().includes(q)
        );
        renderTable(filtered);
    });

    // ── Custom Select: Toggle ─────────────────
    $(document).on('click', '.custom-select__trigger', function (e) {
        e.stopPropagation();
        const $select = $(this).closest('.custom-select');
        const isOpen = $select.hasClass('open');
        // Close all first
        $('.custom-select').removeClass('open');
        if (!isOpen) $select.addClass('open');
    });

    // ── Custom Select: Pick Option ────────────
    $(document).on('click', '.custom-option', function (e) {
        e.stopPropagation();
        const val = $(this).data('value');
        $('#jenisKelamin').val(val);
        $('#genderLabel').text(val).addClass('selected');
        $('.custom-option').removeClass('active');
        $(this).addClass('active');
        $('#genderSelect').removeClass('open');
    });

    // ── Custom Select: Close on outside click ─
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.custom-select').length) {
            $('.custom-select').removeClass('open');
        }
    });
});

/* ── LOAD DATA ───────────────────── */
function loadKtpData() {
    $.ajax({
        url: API_URL, type: 'GET',
        success: function (res) {
            allData = res.data || [];
            renderTable(allData);
            $('#totalCount').text(allData.length);
        },
        error: function () { showError('Gagal memuat data KTP'); }
    });
}

/* ── RENDER TABLE ────────────────── */
function renderTable(data) {
    const tbody = $('#ktpTableBody');
    tbody.empty();

    if (!data || data.length === 0) {
        tbody.html(`
            <tr class="empty-row">
                <td colspan="6">
                    <div class="empty-icon">📋</div>
                    <div class="empty-text">Belum ada data KTP</div>
                </td>
            </tr>`);
        return;
    }

    data.forEach(function (ktp, i) {
        const genderBadge = ktp.jenisKelamin === 'Laki-Laki'
            ? `<span class="badge-gender badge-laki">♂ Laki-Laki</span>`
            : `<span class="badge-gender badge-perempuan">♀ Perempuan</span>`;

        const tr = $(`
            <tr style="animation:fadeInUp 0.3s ${i * 0.04}s ease both;opacity:0">
                <td><span class="nik-cell">${escapeHtml(ktp.nomorKtp)}</span></td>
                <td><strong>${escapeHtml(ktp.namaLengkap)}</strong></td>
                <td title="${escapeHtml(ktp.alamat)}">${escapeHtml(ktp.alamat)}</td>
                <td>${formatDate(ktp.tanggalLahir)}</td>
                <td>${genderBadge}</td>
                <td>
                    <div class="action-group">
                        <button class="btn-edit" title="Edit" onclick="editData(${ktp.id})">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button class="btn-delete" title="Hapus" onclick="deleteData(${ktp.id})">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </td>
            </tr>`);
        tbody.append(tr);
    });
}

/* ── CREATE ──────────────────────── */
function createKtp(data) {
    const btn = $('#btnSubmit');
    btn.prop('disabled', true).html('<div class="spinner" style="width:16px;height:16px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px"></div> Menyimpan...');

    $.ajax({
        url: API_URL, type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            showSuccess('Berhasil!', res.message);
            resetForm();
            loadKtpData();
        },
        error: function (xhr) {
            showError(xhr.responseJSON?.message || 'Gagal menambahkan data');
        },
        complete: function () {
            btn.prop('disabled', false).html(`
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span id="btnText">Simpan Data</span>`);
        }
    });
}

/* ── UPDATE ──────────────────────── */
function updateKtp(id, data) {
    const btn = $('#btnSubmit');
    btn.prop('disabled', true);

    $.ajax({
        url: `${API_URL}/${id}`, type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            showSuccess('Diperbarui!', res.message);
            resetForm();
            loadKtpData();
        },
        error: function (xhr) {
            showError(xhr.responseJSON?.message || 'Gagal memperbarui data');
        },
        complete: function () { btn.prop('disabled', false); }
    });
}

/* ── EDIT ────────────────────────── */
function editData(id) {
    $.ajax({
        url: `${API_URL}/${id}`, type: 'GET',
        success: function (res) {
            const ktp = res.data;
            $('#ktpId').val(ktp.id);
            $('#nomorKtp').val(ktp.nomorKtp);
            $('#namaLengkap').val(ktp.namaLengkap);
            $('#alamat').val(ktp.alamat);
            $('#tanggalLahir').val(ktp.tanggalLahir);

            // Set custom select
            $('#jenisKelamin').val(ktp.jenisKelamin);
            $('#genderLabel').text(ktp.jenisKelamin).addClass('selected');
            $('.custom-option').removeClass('active');
            $(`.custom-option[data-value="${ktp.jenisKelamin}"]`).addClass('active');

            $('#formTitle').text('Edit Data KTP');
            $('#btnText').text('Perbarui Data');

            // Highlight form
            $('.form-panel').css('border-color', 'var(--gold)');
            setTimeout(() => $('.form-panel').css('border-color', ''), 1500);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: function () { showError('Gagal mengambil data'); }
    });
}

/* ── DELETE ──────────────────────── */
function deleteData(id) {
    Swal.fire({
        title: 'Hapus Data?',
        text: 'Data yang dihapus tidak dapat dikembalikan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef233c',
        cancelButtonColor: '#374151',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        background: '#111827',
        color: '#e8eaf0'
    }).then((result) => {
        if (!result.isConfirmed) return;
        $.ajax({
            url: `${API_URL}/${id}`, type: 'DELETE',
            success: function (res) {
                Swal.fire({ title: 'Terhapus!', text: res.message, icon: 'success', background: '#111827', color: '#e8eaf0', confirmButtonColor: '#c9a84c' });
                loadKtpData();
            },
            error: function () { showError('Gagal menghapus data'); }
        });
    });
}

/* ── RESET FORM ──────────────────── */
function resetForm() {
    $('#ktpForm')[0].reset();
    $('#ktpId').val('');
    $('#formTitle').text('Tambah Data KTP');
    $('#btnText').text('Simpan Data');
    $('.form-panel').css('border-color', '');

    // Reset custom select
    $('#jenisKelamin').val('');
    $('#genderLabel').text('Pilih...').removeClass('selected');
    $('.custom-option').removeClass('active');
    $('#genderSelect').removeClass('open');
}

/* ── HELPERS ─────────────────────── */
function showSuccess(title, text) {
    Swal.fire({ icon: 'success', title, text, timer: 2000, showConfirmButton: false, background: '#111827', color: '#e8eaf0' });
}

function showError(text) {
    Swal.fire({ icon: 'error', title: 'Terjadi Kesalahan', text, background: '#111827', color: '#e8eaf0', confirmButtonColor: '#c9a84c' });
}

function escapeHtml(s) {
    if (!s) return '';
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}